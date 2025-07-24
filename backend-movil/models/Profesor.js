const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, unique: true, required: true },
  contraseña: { type: String, required: true }
});

module.exports = mongoose.model('Profesor', profesorSchema);
