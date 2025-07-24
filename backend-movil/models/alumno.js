const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  clase: { type: mongoose.Schema.Types.ObjectId, ref: 'Clase' } // 🔗 Enlace a clase asignada
});

module.exports = mongoose.model('Alumno', alumnoSchema);
