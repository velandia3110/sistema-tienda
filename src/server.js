import app from './app.js';
import { env } from './config/env.js';
import prisma from './config/database.js';

const startServer = async () => {
  try {
    // Probar la conexión a la base de datos
    await prisma.$connect();
    console.log('Conexión exitosa a la base de datos MySQL.');

    app.listen(env.PORT, () => {
      console.log(`Servidor iniciado y escuchando en http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Error crítico al iniciar el servidor:', error.message);
    console.error('Asegúrate de que el servidor MySQL esté corriendo y la cadena DATABASE_URL sea correcta.');
    process.exit(1);
  }
};

startServer();
