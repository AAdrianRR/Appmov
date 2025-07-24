const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Alumno = require('../models/alumno');
const Profesor = require('../models/Profesor');
const { SECRET_KEY } = require('../config');

router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    let usuario = await Alumno.findOne({ correo });
    let rol = 'alumno';

    if (!usuario) {
      usuario = await Profesor.findOne({ correo });
      rol = 'profesor';
    }

    if (!usuario) return res.status(404).json({ message: 'Correo no registrado.' });

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) return res.status(401).json({ message: 'Contraseña incorrecta.' });

    const token = jwt.sign({ id: usuario._id, rol }, SECRET_KEY, { expiresIn: '8h' });

    res.json({ token, nombre: usuario.nombre, rol });
  } catch (error) {
    console.error('🔴 Error en login:', error);
    res.status(500).json({ message: 'Error interno en login.' });
  }
});

module.exports = router;
