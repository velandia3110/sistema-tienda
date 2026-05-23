import { ClientesRepository } from './clientes.repository.js';

const repository = new ClientesRepository();

export class ClientesService {
  async createCliente(data) {
    const existing = await repository.findByCedula(data.cedula);
    if (existing) {
      const error = new Error('Ya existe un cliente registrado con esa cédula');
      error.statusCode = 400;
      throw error;
    }
    return repository.create(data);
  }

  async getAllClientes() {
    return repository.findAll();
  }

  async getClienteById(id) {
    const cliente = await repository.findById(id);
    if (!cliente) {
      const error = new Error('Cliente no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return cliente;
  }

  async updateCliente(id, data) {
    await this.getClienteById(id);
    if (data.cedula) {
      const existing = await repository.findByCedula(data.cedula);
      if (existing && existing.id !== Number(id)) {
        const error = new Error('Ya existe otro cliente registrado con esa cédula');
        error.statusCode = 400;
        throw error;
      }
    }
    return repository.update(id, data);
  }

  async deleteCliente(id) {
    await this.getClienteById(id);
    return repository.delete(id);
  }
}
