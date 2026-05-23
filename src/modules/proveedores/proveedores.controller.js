import { ProveedoresService } from './proveedores.service.js';

const service = new ProveedoresService();

export class ProveedoresController {
  async createProveedor(req, res, next) {
    try {
      const data = req.body;
      const nuevoProveedor = await service.createProveedor(data);
      res.status(201).json({ success: true, data: nuevoProveedor });
    } catch (error) {
      next(error);
    }
  }

  async getProveedores(req, res, next) {
    try {
      const proveedores = await service.getAllProveedores();
      res.json({ success: true, data: proveedores });
    } catch (error) {
      next(error);
    }
  }

  async getProveedorById(req, res, next) {
    try {
      const { id } = req.params;
      const proveedor = await service.getProveedorById(id);
      res.json({ success: true, data: proveedor });
    } catch (error) {
      next(error);
    }
  }

  async updateProveedor(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const proveedorActualizado = await service.updateProveedor(id, data);
      res.json({ success: true, data: proveedorActualizado });
    } catch (error) {
      next(error);
    }
  }

  async deleteProveedor(req, res, next) {
    try {
      const { id } = req.params;
      await service.deleteProveedor(id);
      res.json({ success: true, message: 'Proveedor eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}
