import { Router } from 'express';
import { VentasController } from './ventas.controller.js';
import { validateBody } from '../../middlewares/validator.middleware.js';

const router = Router();
const controller = new VentasController();

const ventaSchema = {
  clienteId: { required: true, type: 'integer' },
  productos: { required: true, type: 'array' }
};

router.post('/', validateBody(ventaSchema), controller.createVenta);
router.get('/', controller.getVentas);
router.get('/:id', controller.getVentaById);

export default router;
