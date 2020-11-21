const express = require('express');
const router = express.Router();
const productos = require('../components/productos/productoControllers');
const verifyToken = require('../lib/verifyToken');

router.get('/', productos.getProductos);
router.get('/id/:id', productos.productoPorID);
router.post('/crear',productos.crearProducto);
router.post('/eliminar/:id', productos.eliminarProducto);
router.post('/actualizar', productos.actualizarProducto)

module.exports = router;