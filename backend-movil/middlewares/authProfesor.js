const jwt = require('jsonwebtoken');
const Profesor = require('../models/Profesor'); //  conexión a base de datos
const { SECRET_KEY } = require('../config');    //  atributos

//  método
module.exports = async (req, res, next) => {     

  // ✅ 2. atributos accedidos desde el request
  const authHeader = req.headers.authorization; // (Línea 6)

  //  excepción 
  if (!authHeader || !authHeader.startsWith('Bearer ')) { // (Línea 8)
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  //  variable 
  const token = authHeader.split(' ')[1];       

  try {                                          

    // validacion
    const decoded = jwt.verify(token, SECRET_KEY); 

    //  atributo 
    if (decoded.rol !== 'profesor') {           
      return res.status(403).json({ message: 'Acceso restringido a profesores.' });
    }

    // método 
    const profesor = await Profesor.findById(decoded.id); 

    // ✅ 6. excepción: profesor no encontrado
    if (!profesor) {                           
      return res.status(401).json({ message: 'Profesor no encontrado.' });
    }

    //  atributos 
    req.profesor = {                            
      id: profesor._id,
      nombre: profesor.nombre,
      apellido: profesor.apellido
      // rol: decoded.rol // opcional
    };

    next();                                     // (Línea 28) ✅ 1. método Express para continuar

  } catch (error) {      //  manejo de errores 
    console.error('🔴 Error en authProfesor:', error.message);
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
