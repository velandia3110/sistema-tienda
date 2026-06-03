import prisma from '../../config/database.js';

export class ClientesRepository {
  async create(data) {
    return prisma.cliente.create({ data });
  }

  async findAll() {
    return prisma.cliente.findMany({
      where: { activo: true }
    });
  }

  async findById(id) {
    return prisma.cliente.findFirst({
      where: { id: Number(id), activo: true }
    });
  }

  async findByCedula(cedula) {
    return prisma.cliente.findFirst({
      where: { cedula, activo: true }
    });
  }

  async update(id, data) {
    return prisma.cliente.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    return prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        activo: false,
        eliminadoEn: new Date()
      }
    });
  }
}
