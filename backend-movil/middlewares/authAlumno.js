const jwt = require('jsonwebtoken');
const Alumno = require('../models/alumno'); // ✅ ajusta si tu archivo se llama diferente

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.rol !== 'alumno') {
      return res.status(403).json({ message: 'Acceso restringido a alumnos.' });
    }

    const alumno = await Alumno.findById(decoded.id);
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado.' });
    }

    req.alumno = {
      id: alumno._id,
      nombre: alumno.nombre,
      correo: alumno.correo
    };

    next();
  } catch (error) {
    console.error('🔴 Error en authAlumno:', error);
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};
