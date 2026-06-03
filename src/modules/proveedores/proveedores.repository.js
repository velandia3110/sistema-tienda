import prisma from '../../config/database.js';

export class ProveedoresRepository {
  async create(data) {
    return prisma.proveedor.create({ data });
  }

  async findAll() {
    return prisma.proveedor.findMany({
      where: { activo: true },
      include: {
        productos: {
          include: {
            producto: {
              select: {
                id:     true,
                nombre: true,
                codigo: true,
              }
            }
          }
        }
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async findById(id) {
    return prisma.proveedor.findFirst({
      where: { id: Number(id), activo: true },
      include: {
        productos: {
          include: {
            producto: {
              select: {
                id: true,
                nombre: true,
                codigo: true,
              }
            }
          }
        }
      }
    });
  }

  async update(id, data) {
    return prisma.proveedor.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    return prisma.proveedor.update({
      where: { id: Number(id) },
      data: {
        activo: false,
        eliminadoEn: new Date()
      }
    });
  }
}
