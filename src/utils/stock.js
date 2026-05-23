/**
 * Verifica si un producto tiene stock bajo y requiere alerta.
 * @param {number} cantidadAlmacenada - Cantidad actual en almacén.
 * @returns {boolean} True si cantidad es menor o igual a 5.
 */
export const requiereAlertaStock = (cantidadAlmacenada) => {
  return cantidadAlmacenada <= 5;
};

/**
 * Obtiene el mensaje de alerta para el stock de un producto si corresponde.
 * @param {number} cantidadAlmacenada - Cantidad actual en almacén.
 * @returns {string|null} Mensaje de alerta o null si no aplica.
 */
export const obtenerAlertaStock = (cantidadAlmacenada) => {
  if (requiereAlertaStock(cantidadAlmacenada)) {
    return "Debe solicitar producto al proveedor";
  }
  return null;
};

/**
 * Verifica si hay suficiente stock disponible para una venta.
 * @param {number} cantidadAlmacenada - Stock actual del producto.
 * @param {number} cantidadSolicitada - Cantidad que se desea vender.
 * @returns {boolean} True si hay stock suficiente.
 */
export const tieneStockSuficiente = (cantidadAlmacenada, cantidadSolicitada) => {
  return cantidadAlmacenada >= cantidadSolicitada;
};
