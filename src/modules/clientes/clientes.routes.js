import { Router } from 'express';
import { ClientesController } from './clientes.controller.js';
import { validateBody } from '../../middlewares/validator.middleware.js';

const router = Router();
const controller = new ClientesController();

const clienteSchema = {
  cedula: { required: true, type: 'string' },
  nombre: { required: true, type: 'string' },
  apellido: { required: true, type: 'string' },
  telefono: { required: true, type: 'string' },
  correo: { required: true, type: 'email' },
};

const updateClienteSchema = {
  cedula: { required: false, type: 'string' },
  nombre: { required: false, type: 'string' },
  apellido: { required: false, type: 'string' },
  telefono: { required: false, type: 'string' },
  correo: { required: false, type: 'email' },
};

router.post('/', validateBody(clienteSchema), controller.createCliente);
router.get('/', controller.getClientes);
router.get('/:id', controller.getClienteById);
router.put('/:id', validateBody(updateClienteSchema), controller.updateCliente);
router.delete('/:id', controller.deleteCliente);

export default router;
