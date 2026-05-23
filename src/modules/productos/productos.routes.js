import { Router } from 'express';
import { ProductosController } from './productos.controller.js';
import { validateBody } from '../../middlewares/validator.middleware.js';

const router = Router();
const controller = new ProductosController();

const productoSchema = {
  codigo: { required: true, type: 'string' },
  nombre: { required: true, type: 'string' },
  peso: { required: true, type: 'number' },
  cantidadAlmacenada: { required: true, type: 'integer' },
  tipoEmpaque: { required: true, type: 'string', enum: ['cartón', 'plástico', 'otro'] },
  precioUnitario: { required: true, type: 'number' },
  categoriaId: { required: true, type: 'integer' },
  proveedorIds: { required: false, type: 'array' },
};

const updateProductoSchema = {
  codigo: { required: false, type: 'string' },
  nombre: { required: false, type: 'string' },
  peso: { required: false, type: 'number' },
  cantidadAlmacenada: { required: false, type: 'integer' },
  tipoEmpaque: { required: false, type: 'string', enum: ['cartón', 'plástico', 'otro'] },
  precioUnitario: { required: false, type: 'number' },
  categoriaId: { required: false, type: 'integer' },
  proveedorIds: { required: false, type: 'array' },
};

router.post('/', validateBody(productoSchema), controller.createProducto);
router.get('/', controller.getProductos);
router.get('/:id', controller.getProductoById);
router.put('/:id', validateBody(updateProductoSchema), controller.updateProducto);
router.delete('/:id', controller.deleteProducto);

export default router;
