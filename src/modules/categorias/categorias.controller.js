import { CategoriasService } from './categorias.service.js';

const service = new CategoriasService();

export class CategoriasController {
  async getCategorias(req, res, next) {
    try {
      const categorias = await service.getAllCategorias();
      res.json({ success: true, data: categorias });
    } catch (error) {
      next(error);
    }
  }

  async getCategoriaById(req, res, next) {
    try {
      const { id } = req.params;
      const categoria = await service.getCategoriaById(id);
      res.json({ success: true, data: categoria });
    } catch (error) {
      next(error);
    }
  }
}
