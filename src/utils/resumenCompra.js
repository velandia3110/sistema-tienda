/**
 * Genera el resumen estructurado de una transacción de Venta.
 * @param {object} cliente - Datos del cliente.
 * @param {Array} detalles - Listado de productos vendidos con sus detalles.
 * @param {number|string} subtotal - Subtotal de la venta.
 * @param {number|string} impuestos - Total de impuestos.
 * @param {number|string} total - Total de la venta.
 * @returns {object} Resumen formateado.
 */
export const generarResumenVenta = (cliente, detalles, subtotal, impuestos, total) => {
  return {
    cliente: {
      cedula: cliente.cedula,
      nombre: `${cliente.nombre} ${cliente.apellido}`,
      telefono: cliente.telefono,
      correo: cliente.correo,
    },
    productos: detalles.map((d) => ({
      codigo: d.producto.codigo,
      nombre: d.producto.nombre,
      cantidad: d.cantidad,
      precioUnitario: Number(d.precioUnitario),
      impuestoPorcentaje: `${(Number(d.impuestoPorcentaje) * 100).toFixed(0)}%`,
      impuestoMonto: Number(d.impuestoMonto),
      subtotal: Number(d.subtotal),
      total: Number(d.total),
    })),
    resumenValores: {
      subtotal: Number(subtotal),
      impuestos: Number(impuestos),
      total: Number(total),
    },
  };
};

/**
 * Genera el resumen estructurado de una compra realizada a un proveedor.
 * @param {object} proveedor - Datos del proveedor.
 * @param {Array} detalles - Listado de productos comprados.
 * @param {number|string} total - Total gastado.
 * @returns {object} Resumen formateado.
 */
export const generarResumenCompra = (proveedor, detalles, total) => {
  return {
    proveedor: {
      nombre: proveedor.nombre,
      telefono: proveedor.telefono,
      ciudad: proveedor.ciudad,
    },
    productos: detalles.map((d) => ({
      codigo: d.producto.codigo,
      nombre: d.producto.nombre,
      cantidad: d.cantidad,
      precioUnitario: Number(d.precioUnitario),
      subtotal: Number(d.subtotal),
    })),
    resumenValores: {
      total: Number(total),
    },
  };
};
