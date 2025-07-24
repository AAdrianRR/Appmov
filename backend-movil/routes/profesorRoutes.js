const express = require('express');
const router = express.Router();

const authProfesor = require('../middlewares/authProfesor');
const { obtenerClasesPorProfesor } = require('../controllers/claseController');

// 🔐 Endpoint protegido
router.get('/mis-clases', authProfesor, obtenerClasesPorProfesor);

// 🧪 Ruta de prueba para confirmar que está activo
router.get('/ping', (req, res) => {
  res.send('🟢 Ruta /profesor activa');
});

module.exports = router;
