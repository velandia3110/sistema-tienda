import { Router } from 'express';
import { ComprasController } from './compras.controller.js';
import { validateBody } from '../../middlewares/validator.middleware.js';

const router = Router();
const controller = new ComprasController();

const compraSchema = {
  proveedorId: { required: true, type: 'integer' },
  productos: { required: true, type: 'array' }
};

router.post('/', validateBody(compraSchema), controller.createCompra);
router.get('/', controller.getCompras);
router.get('/:id', controller.getCompraById);

export default router;
