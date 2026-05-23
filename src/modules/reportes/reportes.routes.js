import { Router } from 'express';
import { ReportesController } from './reportes.controller.js';

const router = Router();
const controller = new ReportesController();

router.get('/clientes-mas-compras', controller.getClientesMasCompras);
router.get('/clientes-compra-unica', controller.getClientesCompraUnica);
router.get('/cliente-mas-frecuente', controller.getClienteMasFrecuente);

export default router;
