import { CategoriasRepository } from './categorias.repository.js';

const repository = new CategoriasRepository();

export class CategoriasService {
  async getAllCategorias() {
    return repository.findAll();
  }

  async getCategoriaById(id) {
    const categoria = await repository.findById(id);
    if (!categoria) {
      const error = new Error('Categoría no encontrada');
      error.statusCode = 404;
      throw error;
    }
    return categoria;
  }
}
