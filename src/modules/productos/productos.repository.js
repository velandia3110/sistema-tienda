import prisma from '../../config/database.js';

export class ProductosRepository {
  async create(data, proveedorIds = []) {
    const { categoriaId, ...rest } = data;
    return prisma.producto.create({
      data: {
        ...rest,
        categoria: { connect: { id: Number(categoriaId) } },
        proveedores: {
          create: proveedorIds.map((id) => ({
            proveedor: { connect: { id: Number(id) } }
          }))
        }
      },
      include: {
        categoria: true,
        proveedores: {
          include: { proveedor: true }
        }
      }
    });
  }

  async findAll() {
    return prisma.producto.findMany({
      where: {
        activo: true
      },
      include: {
        categoria: true,
        proveedores: {
          include: { proveedor: true }
        }
      }
    });
  }

  async findById(id) {
    return prisma.producto.findFirst({
      where: {
        id: Number(id),
        activo: true
      },
      include: {
        categoria: true,
        proveedores: {
          include: { proveedor: true }
        }
      }
    });
  }

  async findByCodigo(codigo) {
    return prisma.producto.findUnique({
      where: { codigo },
      include: {
        categoria: true,
        proveedores: {
          include: { proveedor: true }
        }
      }
    });
  }

  async update(id, data, proveedorIds) {
    const { categoriaId, ...rest } = data;
    
    const updateData = { ...rest };
    if (categoriaId) {
      updateData.categoria = { connect: { id: Number(categoriaId) } };
    }

    if (proveedorIds) {
      updateData.proveedores = {
        deleteMany: {},
        create: proveedorIds.map((pId) => ({
          proveedor: { connect: { id: Number(pId) } }
        }))
      };
    }

    return prisma.producto.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        categoria: true,
        proveedores: {
          include: { proveedor: true }
        }
      }
    });
  }


  async delete(id) {
    return await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        activo: false,
        eliminadoEn: new Date()
      }
    });
  }
}
