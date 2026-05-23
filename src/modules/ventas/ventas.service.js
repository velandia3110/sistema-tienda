import { VentasRepository } from './ventas.repository.js';
import { generarResumenVenta } from '../../utils/resumenCompra.js';
import prisma from '../../config/database.js';

const repository = new VentasRepository();

export class VentasService {
  async createVenta(clienteId, items) {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) }
    });
    if (!cliente) {
      const error = new Error('Cliente no encontrado');
      error.statusCode = 404;
      throw error;
    }

    if (!items || items.length === 0) {
      const error = new Error('Debe incluir al menos un producto para la venta');
      error.statusCode = 400;
      throw error;
    }

    const venta = await repository.create(clienteId, items);

    return generarResumenVenta(
      venta.cliente,
      venta.detalles,
      venta.subtotal,
      venta.impuestos,
      venta.total
    );
  }

  async getAllVentas() {
    return repository.findAll();
  }

  async getVentaById(id) {
    const venta = await repository.findById(id);
    if (!venta) {
      const error = new Error('Venta no encontrada');
      error.statusCode = 404;
      throw error;
    }
    return generarResumenVenta(
      venta.cliente,
      venta.detalles,
      venta.subtotal,
      venta.impuestos,
      venta.total
    );
  }
}
