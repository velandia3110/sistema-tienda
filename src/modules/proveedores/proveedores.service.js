import { ProveedoresRepository } from './proveedores.repository.js';

const repository = new ProveedoresRepository();

export class ProveedoresService {
  async createProveedor(data) {
    return repository.create(data);
  }

  async getAllProveedores() {
    return repository.findAll();
  }

  async getProveedorById(id) {
    const proveedor = await repository.findById(id);
    if (!proveedor) {
      const error = new Error('Proveedor no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return proveedor;
  }

  async updateProveedor(id, data) {
    await this.getProveedorById(id);
    return repository.update(id, data);
  }

  async deleteProveedor(id) {
    await this.getProveedorById(id);
    return repository.delete(id);
  }
}
