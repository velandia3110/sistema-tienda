import { VentasService } from './ventas.service.js';

const service = new VentasService();

export class VentasController {
  async createVenta(req, res, next) {
    try {
      const { clienteId, productos } = req.body;
      const resumen = await service.createVenta(clienteId, productos);
      res.status(201).json({ success: true, data: resumen });
    } catch (error) {
      next(error);
    }
  }

  async getVentas(req, res, next) {
    try {
      const ventas = await service.getAllVentas();
      res.json({ success: true, data: ventas });
    } catch (error) {
      next(error);
    }
  }

  async getVentaById(req, res, next) {
    try {
      const { id } = req.params;
      const resumen = await service.getVentaById(id);
      res.json({ success: true, data: resumen });
    } catch (error) {
      next(error);
    }
  }
}
