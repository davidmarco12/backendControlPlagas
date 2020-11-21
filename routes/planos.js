const express = require('express');
const router = express.Router();
const planos = require('../components/planos/planosControllers');
const verifyToken = require('../lib/verifyToken');

router.get('/', planos.getPlanos);
router.get('/id/:id', planos.planoPorId);
router.post('/crear', planos.crearPlano);
router.get('/offline', planos.offlinePlanos);
router.post('/eliminar/:id', planos.deletePlanoById);

module.exports = router;