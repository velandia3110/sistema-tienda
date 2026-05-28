import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import { errorHandler } from './middlewares/error.middleware.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas de módulos
import categoriasRoutes from './modules/categorias/categorias.routes.js';
import clientesRoutes from './modules/clientes/clientes.routes.js';
import proveedoresRoutes from './modules/proveedores/proveedores.routes.js';
import productosRoutes from './modules/productos/productos.routes.js';
import ventasRoutes from './modules/ventas/ventas.routes.js';
import comprasRoutes from './modules/compras/compras.routes.js';
import reportesRoutes from './modules/reportes/reportes.routes.js';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./config/swagger.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Documentación de API con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Montar enrutadores bajo /api
app.use('/api/categorias', categoriasRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/reportes', reportesRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  const error = new Error(`La ruta solicitada no existe - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Middleware global de manejo de errores
app.use(errorHandler);

export default app;
