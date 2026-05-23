import { Router } from 'express';
import { ProveedoresController } from './proveedores.controller.js';
import { validateBody } from '../../middlewares/validator.middleware.js';

const router = Router();
const controller = new ProveedoresController();

const proveedorSchema = {
  nombre: { required: true, type: 'string' },
  telefono: { required: true, type: 'string' },
  ciudad: { required: true, type: 'string' },
};

const updateProveedorSchema = {
  nombre: { required: false, type: 'string' },
  telefono: { required: false, type: 'string' },
  ciudad: { required: false, type: 'string' },
};

router.post('/', validateBody(proveedorSchema), controller.createProveedor);
router.get('/', controller.getProveedores);
router.get('/:id', controller.getProveedorById);
router.put('/:id', validateBody(updateProveedorSchema), controller.updateProveedor);
router.delete('/:id', controller.deleteProveedor);

export default router;
