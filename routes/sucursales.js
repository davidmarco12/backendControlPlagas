const express = require('express');
const router = express.Router();
const sucursales = require('../components/sucursales/sucursalesControllers');
const verifyToken = require('../lib/verifyToken');

router.get('/', sucursales.getSucursales);
router.get('/id/:id', sucursales.sucursalPorId);
router.post('/crear', sucursales.crearSucursal);
router.get('/offline', sucursales.offlineSucursales);
router.post('/eliminar/:id', sucursales.deleteSucursalById);
router.post('/actualizar/', sucursales.actualizarSucursal);


module.exports = router;