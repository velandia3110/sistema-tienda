import prisma from '../../config/database.js';

export class ComprasRepository {
  async create(proveedorId, items) {
    return prisma.$transaction(async (tx) => {
      let totalAcumulado = 0;
      const detallesToCreate = [];

      for (const item of items) {
        const product = await tx.producto.findUnique({
          where: { id: Number(item.productoId) }
        });

        if (!product) {
          throw new Error(`Producto con ID ${item.productoId} no encontrado`);
        }

        // Aumentar stock del producto comprado
        await tx.producto.update({
          where: { id: product.id },
          data: {
            cantidadAlmacenada: product.cantidadAlmacenada + item.cantidad
          }
        });

        const precioUnit = Number(item.precioUnitario);
        const itemSubtotal = precioUnit * item.cantidad;
        totalAcumulado += itemSubtotal;

        detallesToCreate.push({
          productoId: product.id,
          cantidad: item.cantidad,
          precioUnitario: precioUnit,
          subtotal: itemSubtotal
        });
      }

      const compra = await tx.compraProveedor.create({
        data: {
          proveedorId: Number(proveedorId),
          total: totalAcumulado,
          detalles: {
            create: detallesToCreate
          }
        },
        include: {
          proveedor: true,
          detalles: {
            include: {
              producto: true
            }
          }
        }
      });

      return compra;
    });
  }

  async findAll() {
    return prisma.compraProveedor.findMany({
      include: {
        proveedor: true,
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
    return prisma.compraProveedor.findUnique({
      where: { id: Number(id) },
      include: {
        proveedor: true,
        detalles: {
          include: {
            producto: true
          }
        }
      }
    });
  }
}
