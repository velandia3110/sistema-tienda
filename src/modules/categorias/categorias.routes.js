import { Router } from 'express';
import { CategoriasController } from './categorias.controller.js';

const router = Router();
const controller = new CategoriasController();

router.get('/', controller.getCategorias);
router.get('/:id', controller.getCategoriaById);

export default router;
