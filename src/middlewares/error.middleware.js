export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Error interno del servidor';

  return res.status(status).json({
    success: false,
    error: {
      status,
      message,
      details: err.details || null
    }
  });
};