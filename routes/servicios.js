const express = require('express');
const router = express.Router();
const servicios = require('../components/servicios/serviciosControllers');


router.get('/', servicios.getServicios);
router.get('/id/:id', servicios.servicioPorId);
router.post('/crear', servicios.crearServicio);
router.get('/offline', servicios.offlineServicios);
router.get('/adquiridos/offline', servicios.offlineServiciosAdquiridos);
router.get('/campos/offline', servicios.offlineCampos);
router.get('/opciones/offline', servicios.offlineOpciones);
router.get('/equipos/offline', servicios.offlineEquipos);
router.post('/equipos/crear', servicios.crearEquipos);
router.get('/equipos/sucursal/:id', servicios.equiposPorIdSucursal);
router.get('/sector/offline', servicios.offlineSector);
router.post('/sectores/crear', servicios.crearSectores);
router.post('/eliminar/:id', servicios.deleteServicioById);
router.post('/eliminarEquipos/:id', servicios.deleteEquiposById);




module.exports = router;