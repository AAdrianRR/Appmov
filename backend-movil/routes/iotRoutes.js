const express = require('express');
const router = express.Router();
const RegistroIot = require('../models/registroIot');


router.get('/:claseId/movil', async (req, res) => {
  try {
    const registros = await RegistroIot.find({ clase: req.params.claseId })
      .sort({ fecha: -1 })
      .limit(5); 

    res.json(registros);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener registros para app móvil.',
      error
    });
  }
});

module.exports = router;
