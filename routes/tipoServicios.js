const express = require('express');
const router = express.Router();
const servicios = require('../components/servicios/serviciosControllers');


router.get('/', servicios.getTipoServicios);
router.get('/:id', servicios.tipoPorId);

module.exports = router;