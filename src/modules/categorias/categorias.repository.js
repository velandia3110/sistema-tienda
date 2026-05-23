import prisma from '../../config/database.js';

export class CategoriasRepository {
  async findAll() {
    return prisma.categoria.findMany();
  }

  async findById(id) {
    return prisma.categoria.findUnique({
      where: { id: Number(id) }
    });
  }

  async findByName(nombre) {
    return prisma.categoria.findUnique({
      where: { nombre }
    });
  }
}
