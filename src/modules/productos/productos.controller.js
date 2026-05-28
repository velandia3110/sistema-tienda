import { ProductosService } from './productos.service.js';

const service = new ProductosService();

export class ProductosController {
  async createProducto(req, res, next) {
    try {
      const { proveedorIds, ...data } = req.body;
      const nuevoProducto = await service.createProducto(data, proveedorIds);
      res.status(201).json({ success: true, data: nuevoProducto });
    } catch (error) {
      next(error);
    }
  }

  async getProductos(req, res, next) {
    try {
      const productos = await service.getAllProductos();
      res.json({ success: true, data: productos });
    } catch (error) {
      next(error);
    }
  }

  async getProductoById(req, res, next) {
    try {
      const { id } = req.params;
      const producto = await service.getProductoById(id);
      res.json({ success: true, data: producto });
    } catch (error) {
      next(error);
    }
  }

  async updateProducto(req, res, next) {
    try {
      const { id } = req.params;
      const { proveedorIds, ...data } = req.body;
      const productoActualizado = await service.updateProducto(id, data, proveedorIds);
      res.json({ success: true, data: productoActualizado });
    } catch (error) {
      next(error);
    }
  }

  async uploadImagen(req, res, next) {
    try {
      const { id } = req.params;
      if (!req.file) {
        const error = new Error('Por favor, suba un archivo de imagen válido.');
        error.statusCode = 400;
        throw error;
      }
      
      const imagenUrl = `/uploads/${req.file.filename}`;
      const productoActualizado = await service.updateImagen(id, imagenUrl);
      res.json({ success: true, data: productoActualizado });
    } catch (error) {
      next(error);
    }
  }

  async deleteProducto(req, res, next) {
    try {
      const { id } = req.params;
      await service.deleteProducto(id);
      res.json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}
