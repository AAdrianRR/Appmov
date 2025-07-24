// backend-movil/models/Clase.js
const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
  codigoClase: String,
  nombre: String,
  maestro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor'
  },
  alumnos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alumno'
  }],
  dias: [String],
  hora: String,
  fechaInicio: Date,
  fechaFin: Date
}, {
  versionKey: false,
  timestamps: false
});

module.exports = mongoose.model('Clase', claseSchema);
