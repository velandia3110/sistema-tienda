/**
 * Obtiene el porcentaje de impuesto asociado a una categoría.
 * @param {string} categoriaNombre - Nombre de la categoría.
 * @returns {number} Porcentaje de impuesto (ej. 0.07 para 7%)
 */
export const obtenerImpuestoPorcentaje = (categoriaNombre) => {
  if (!categoriaNombre) return 0;
  const nombreNormalizado = categoriaNombre.toLowerCase().trim();
  switch (nombreNormalizado) {
    case 'papelería':
    case 'papeleria':
      return 0.07;
    case 'droguería':
    case 'drogueria':
      return 0.03;
    case 'aseo':
      return 0.05;
    case 'supermercado':
      return 0.00;
    default:
      return 0.00;
  }
};

/**
 * Calcula el monto del impuesto para un producto dado su precio unitario y cantidad.
 * @param {number} precioUnitario - Precio unitario del producto.
 * @param {number} cantidad - Cantidad del producto.
 * @param {number} impuestoPorcentaje - Porcentaje de impuesto (ej. 0.07).
 * @returns {number} Monto de impuesto redondeado a 2 decimales.
 */
export const calcularImpuestoMonto = (precioUnitario, cantidad, impuestoPorcentaje) => {
  const subtotal = precioUnitario * cantidad;
  return Number((subtotal * impuestoPorcentaje).toFixed(2));
};
