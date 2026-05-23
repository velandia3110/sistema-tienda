import { ClientesService } from './clientes.service.js';

const service = new ClientesService();

export class ClientesController {
  async createCliente(req, res, next) {
    try {
      const data = req.body;
      const nuevoCliente = await service.createCliente(data);
      res.status(201).json({ success: true, data: nuevoCliente });
    } catch (error) {
      next(error);
    }
  }

  async getClientes(req, res, next) {
    try {
      const clientes = await service.getAllClientes();
      res.json({ success: true, data: clientes });
    } catch (error) {
      next(error);
    }
  }

  async getClienteById(req, res, next) {
    try {
      const { id } = req.params;
      const cliente = await service.getClienteById(id);
      res.json({ success: true, data: cliente });
    } catch (error) {
      next(error);
    }
  }

  async updateCliente(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const clienteActualizado = await service.updateCliente(id, data);
      res.json({ success: true, data: clienteActualizado });
    } catch (error) {
      next(error);
    }
  }

  async deleteCliente(req, res, next) {
    try {
      const { id } = req.params;
      await service.deleteCliente(id);
      res.json({ success: true, message: 'Cliente eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}
