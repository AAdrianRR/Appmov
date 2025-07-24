const Clase = require('../models/clase');

const obtenerClasesPorProfesor = async (req, res) => {
  try {
    const clases = await Clase.find({ maestro: req.profesor.id })
      .populate('maestro', 'nombre apellido')       // ✅ para mostrar al profesor
      .populate('alumnos', 'nombre apellido');      // ✅ para mostrar a los alumnos

    res.status(200).json(clases);
  } catch (error) {
    console.error('❌ Error al obtener clases del profesor:', error);
    res.status(500).json({ message: 'Error al obtener clases del profesor', error });
  }
};

module.exports = { obtenerClasesPorProfesor };
