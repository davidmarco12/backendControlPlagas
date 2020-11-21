const express = require('express');
const router = express.Router();
const tecnicos = require('../components/tecnicos/tecnicosControllers');
const verifyToken = require('../lib/verifyToken');


router.get('/', tecnicos.getTecnicos);
router.get('/id/:id', tecnicos.tecnicoPorId);
router.post('/crear', tecnicos.crearTecnico);
router.delete('/eliminar/:id', tecnicos.eliminarTecnico);
router.get('/offline',tecnicos.offlineTecnicos);

module.exports = router;