import prisma from '../../config/database.js';

export class VentasRepository {
  async create(clienteId, items) {
    return prisma.$transaction(async (tx) => {
      let subtotalAcumulado = 0;
      let impuestosAcumulado = 0;
      let totalAcumulado = 0;

      const detallesToCreate = [];

      for (const item of items) {
        const product = await tx.producto.findUnique({
          where: { id: Number(item.productoId) },
          include: { categoria: true }
        });

        if (!product) {
          throw new Error(`Producto con ID ${item.productoId} no encontrado`);
        }

        if (product.cantidadAlmacenada < item.cantidad) {
          throw new Error(`Stock insuficiente para el producto '${product.nombre}'. Stock actual: ${product.cantidadAlmacenada}`);
        }

        // Descontar inventario
        await tx.producto.update({
          where: { id: product.id },
          data: {
            cantidadAlmacenada: product.cantidadAlmacenada - item.cantidad
          }
        });

        // Calcular valores
        const precioUnit = Number(product.precioUnitario);
        const taxPct = Number(product.categoria.impuesto);
        const itemSubtotal = precioUnit * item.cantidad;
        const itemTaxMonto = Number((itemSubtotal * taxPct).toFixed(2));
        const itemTotal = itemSubtotal + itemTaxMonto;

        subtotalAcumulado += itemSubtotal;
        impuestosAcumulado += itemTaxMonto;
        totalAcumulado += itemTotal;

        detallesToCreate.push({
          productoId: product.id,
          cantidad: item.cantidad,
          precioUnitario: precioUnit,
          impuestoPorcentaje: taxPct,
          impuestoMonto: itemTaxMonto,
          subtotal: itemSubtotal,
          total: itemTotal
        });
      }

      // Guardar venta y detalles
      const venta = await tx.venta.create({
        data: {
          clienteId: Number(clienteId),
          subtotal: subtotalAcumulado,
          impuestos: impuestosAcumulado,
          total: totalAcumulado,
          detalles: {
            create: detallesToCreate
          }
        },
        include: {
          cliente: true,
          detalles: {
            include: {
              producto: true
            }
          }
        }
      });

      return venta;
    });
  }

  async findAll() {
    return prisma.venta.findMany({
      include: {
        cliente: true,
        detalles: {
          include: {
            producto: true
          }
        }
      },
      orderBy: {
        fecha: 'desc'
      }
    });
  }

  async findById(id) {
    return prisma.venta.findUnique({
      where: { id: Number(id) },
      include: {
        cliente: true,
        detalles: {
          include: {
            producto: true
          }
        }
      }
    });
  }
}
