const express = require('express');
const router = express.Router();
const formularios = require('../components/formularios/formularioControllers');
const verifyToken = require('../lib/verifyToken');

router.post('/crear/', formularios.crearFormulario);
router.post('/respuestas/crear', formularios.crearRespuesta);


module.exports = router;