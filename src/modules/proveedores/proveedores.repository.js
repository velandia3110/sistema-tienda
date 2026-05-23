import prisma from '../../config/database.js';

export class ProveedoresRepository {
  async create(data) {
    return prisma.proveedor.create({ data });
  }

  async findAll() {
    return prisma.proveedor.findMany();
  }

  async findById(id) {
    return prisma.proveedor.findUnique({
      where: { id: Number(id) }
    });
  }

  async update(id, data) {
    return prisma.proveedor.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    return prisma.proveedor.delete({
      where: { id: Number(id) }
    });
  }
}
