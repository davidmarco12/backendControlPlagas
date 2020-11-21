const express = require('express');
const router = express.Router();
const visitas = require('../components/visitas/visitasControllers');


router.get('/', visitas.getVisitas);
router.get('/id/:id', visitas.visitaPorId);
router.get('/offline',visitas.offlineVisitas);
router.post('/crear', visitas.crearVisita);
router.post('/actualizar', visitas.actualizarVisita);
router.post('/update', visitas.actualizarVisitaNueva); //actualiza la visita nueva
router.post('/eliminar/:id', visitas.deleteVisitaById);

module.exports = router;