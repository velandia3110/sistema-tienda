import { obtenerImpuestoPorcentaje, calcularImpuestoMonto } from './src/utils/impuestos.js';
import { requiereAlertaStock, obtenerAlertaStock, tieneStockSuficiente } from './src/utils/stock.js';
import { generarResumenVenta, generarResumenCompra } from './src/utils/resumenCompra.js';

console.log('--- EMPEZANDO PRUEBAS DE LOGICA DEL NEGOCIO ---');

try {
  // 1. Probar Impuestos
  console.assert(obtenerImpuestoPorcentaje('Papelería') === 0.07, 'Error Papelería 7%');
  console.assert(obtenerImpuestoPorcentaje('Droguería') === 0.03, 'Error Droguería 3%');
  console.assert(obtenerImpuestoPorcentaje('Aseo') === 0.05, 'Error Aseo 5%');
  console.assert(obtenerImpuestoPorcentaje('Supermercado') === 0.00, 'Error Supermercado 0%');
  console.assert(obtenerImpuestoPorcentaje('papeleria') === 0.07, 'Error normalización papeleria 7%');

  const impuestoMonto = calcularImpuestoMonto(100, 3, 0.07);
  console.assert(impuestoMonto === 21.00, `Error cálculo de impuesto, esperado 21, obtenido ${impuestoMonto}`);
  console.log('Utilidades de Impuestos validadas con éxito.');

  // 2. Probar Stock
  console.assert(requiereAlertaStock(5) === true, 'Error: stock 5 debería lanzar alerta');
  console.assert(requiereAlertaStock(6) === false, 'Error: stock 6 no debería lanzar alerta');
  console.assert(obtenerAlertaStock(5) === "Debe solicitar producto al proveedor", 'Error mensaje alerta stock');
  console.assert(obtenerAlertaStock(8) === null, 'Error mensaje alerta stock nulo');
  console.assert(tieneStockSuficiente(10, 3) === true, 'Error validación stock suficiente');
  console.assert(tieneStockSuficiente(2, 5) === false, 'Error validación stock insuficiente');
  console.log('Utilidades de Stock validadas con éxito.');

  // 3. Probar Resumen
  const cliente = { cedula: '12345678', nombre: 'Juan', apellido: 'Pérez', telefono: '3001234567', correo: 'juan.perez@email.com' };
  const detalles = [
    {
      producto: { codigo: 'PAP-001', nombre: 'Cuaderno Doble Línea' },
      cantidad: 2,
      precioUnitario: 5000.00,
      impuestoPorcentaje: 0.07,
      impuestoMonto: 700.00,
      subtotal: 10000.00,
      total: 10700.00
    }
  ];
  
  const resumen = generarResumenVenta(cliente, detalles, 10000.00, 700.00, 10700.00);
  console.assert(resumen.cliente.nombre === 'Juan Pérez', 'Error nombre cliente en resumen');
  console.assert(resumen.productos[0].impuestoPorcentaje === '7%', 'Error formato porcentaje en resumen');
  console.assert(resumen.resumenValores.total === 10700.00, 'Error total en resumen');
  console.log('Utilidades de Resumen de Ventas validadas con éxito.');

  console.log('--- TODAS LAS PRUEBAS DE LOGICA PASARON CON ÉXITO ---');
} catch (error) {
  console.error('Fallo en las pruebas de verificación lógica:', error);
  process.exit(1);
}
