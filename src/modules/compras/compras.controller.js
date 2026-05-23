import { ComprasService } from './compras.service.js';

const service = new ComprasService();

export class ComprasController {
  async createCompra(req, res, next) {
    try {
      const { proveedorId, productos } = req.body;
      const resumen = await service.createCompra(proveedorId, productos);
      res.status(201).json({ success: true, data: resumen });
    } catch (error) {
      next(error);
    }
  }

  async getCompras(req, res, next) {
    try {
      const compras = await service.getAllCompras();
      res.json({ success: true, data: compras });
    } catch (error) {
      next(error);
    }
  }

  async getCompraById(req, res, next) {
    try {
      const { id } = req.params;
      const resumen = await service.getCompraById(id);
      res.json({ success: true, data: resumen });
    } catch (error) {
      next(error);
    }
  }
}
