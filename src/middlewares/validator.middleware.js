export const validateBody = (schema) => {
  return (req, res, next) => {
    const errors = [];
    
    for (const [key, rule] of Object.entries(schema)) {
      const value = req.body[key];
      
      // Validar obligatorios
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.push(`El campo '${key}' es requerido.`);
        continue;
      }

      if (value !== undefined && value !== null && value !== '') {
        // Validar tipos de datos
        if (rule.type === 'number' && typeof value !== 'number') {
          errors.push(`El campo '${key}' debe ser de tipo numérico.`);
        } else if (rule.type === 'integer' && !Number.isInteger(value)) {
          errors.push(`El campo '${key}' debe ser un número entero.`);
        } else if (rule.type === 'string' && typeof value !== 'string') {
          errors.push(`El campo '${key}' debe ser de tipo texto.`);
        } else if (rule.type === 'array' && !Array.isArray(value)) {
          errors.push(`El campo '${key}' debe ser un arreglo.`);
        } else if (rule.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(`El campo '${key}' debe ser un correo electrónico válido.`);
          }
        }
        
        // Validar valores específicos
        if (rule.enum && !rule.enum.includes(value)) {
          errors.push(`El campo '${key}' debe ser uno de los siguientes valores: ${rule.enum.join(', ')}.`);
        }
      }
    }

    if (errors.length > 0) {
      const err = new Error('Datos de entrada no válidos');
      err.statusCode = 400;
      err.details = errors;
      return next(err);
    }

    next();
  };
};
