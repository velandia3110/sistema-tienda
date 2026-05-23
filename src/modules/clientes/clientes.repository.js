import prisma from '../../config/database.js';

export class ClientesRepository {
  async create(data) {
    return prisma.cliente.create({ data });
  }

  async findAll() {
    return prisma.cliente.findMany();
  }

  async findById(id) {
    return prisma.cliente.findUnique({
      where: { id: Number(id) }
    });
  }

  async findByCedula(cedula) {
    return prisma.cliente.findUnique({
      where: { cedula }
    });
  }

  async update(id, data) {
    return prisma.cliente.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    return prisma.cliente.delete({
      where: { id: Number(id) }
    });
  }
}
