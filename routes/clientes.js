const express = require('express');
const router = express.Router();
const clientes = require('../components/clientes/clienteControllers');
const verifyToken = require('../lib/verifyToken');

router.get('/', clientes.getClientes);
router.get('/id/:id', clientes.clientePorId);
router.post('/crear',clientes.crearCliente);
router.post('/eliminar/:id', clientes.eliminarCliente);
router.get('/offline',clientes.offlineClientes);
router.post('/actualizar',clientes.actualizarCliente);
router.post('/actualizarLogo', clientes.actualizarLogoCliente);
router.post('/eliminarLogo', clientes.eliminarLogoCliente);

module.exports = router;