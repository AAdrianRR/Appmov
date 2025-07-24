const express = require('express');
const router = express.Router();

const authAlumno = require('../middlewares/authAlumno');
const { getPanelAlumno } = require('../controllers/alumnoPanelController');

router.get('/panel', authAlumno, getPanelAlumno);

module.exports = router;
