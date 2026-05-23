import { ComprasRepository } from './compras.repository.js';
import { generarResumenCompra } from '../../utils/resumenCompra.js';
import prisma from '../../config/database.js';

const repository = new ComprasRepository();

export class ComprasService {
  async createCompra(proveedorId, items) {
    const proveedor = await prisma.proveedor.findUnique({
      where: { id: Number(proveedorId) }
    });
    if (!proveedor) {
      const error = new Error('Proveedor no encontrado');
      error.statusCode = 404;
      throw error;
    }

    if (!items || items.length === 0) {
      const error = new Error('Debe incluir al menos un producto para registrar la compra');
      error.statusCode = 400;
      throw error;
    }

    for (const item of items) {
      if (!item.productoId || !item.cantidad || !item.precioUnitario) {
        const error = new Error('Cada producto debe tener productoId, cantidad y precioUnitario');
        error.statusCode = 400;
        throw error;
      }
    }

    const compra = await repository.create(proveedorId, items);

    return generarResumenCompra(compra.proveedor, compra.detalles, compra.total);
  }

  async getAllCompras() {
    return repository.findAll();
  }

  async getCompraById(id) {
    const compra = await repository.findById(id);
    if (!compra) {
      const error = new Error('Compra no encontrada');
      error.statusCode = 404;
      throw error;
    }
    return generarResumenCompra(compra.proveedor, compra.detalles, compra.total);
  }
}
