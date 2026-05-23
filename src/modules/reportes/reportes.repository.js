import prisma from '../../config/database.js';

export class ReportesRepository {
  async getClientesMasCompras() {
    return prisma.$queryRaw`
      SELECT c.id, c.cedula, c.nombre, c.apellido, c.telefono, c.correo, 
             CAST(COUNT(v.id) AS SIGNED) AS cantidadCompras, 
             CAST(COALESCE(SUM(v.total), 0) AS DOUBLE) AS totalGastado
      FROM Cliente c
      INNER JOIN Venta v ON c.id = v.clienteId
      GROUP BY c.id, c.cedula, c.nombre, c.apellido, c.telefono, c.correo
      ORDER BY totalGastado DESC;
    `;
  }

  async getClientesCompraUnica() {
    return prisma.$queryRaw`
      SELECT c.id, c.cedula, c.nombre, c.apellido, c.telefono, c.correo,
             CAST(COUNT(v.id) AS SIGNED) AS cantidadCompras,
             CAST(SUM(v.total) AS DOUBLE) AS totalGastado
      FROM Cliente c
      INNER JOIN Venta v ON c.id = v.clienteId
      GROUP BY c.id, c.cedula, c.nombre, c.apellido, c.telefono, c.correo
      HAVING COUNT(v.id) = 1;
    `;
  }

  async getClienteMasFrecuente() {
    const result = await prisma.$queryRaw`
      SELECT c.id, c.cedula, c.nombre, c.apellido, c.telefono, c.correo,
             CAST(COUNT(v.id) AS SIGNED) AS cantidadCompras,
             CAST(COALESCE(SUM(v.total), 0) AS DOUBLE) AS totalGastado
      FROM Cliente c
      INNER JOIN Venta v ON c.id = v.clienteId
      GROUP BY c.id, c.cedula, c.nombre, c.apellido, c.telefono, c.correo
      ORDER BY cantidadCompras DESC, totalGastado DESC
      LIMIT 1;
    `;
    return result.length > 0 ? result[0] : null;
  }
}
