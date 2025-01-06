    const express = require('express');
    const router = express.Router();
    const productoController = require('../controller/productoC');

    // Rutas CRUD
    router.get('/producto', productoController.getProductos); // Obtener todos los clientes
    router.get('/producto/:id', productoController.getProductoById); // Obtener cliente por ID
    router.post('/producto', productoController.createProducto); // Crear un cliente
    router.put('/producto/:id', productoController.updateProducto); // Actualizar cliente
    router.delete('/producto/:id', productoController.deleteProducto); // FUNCIONES TODAVIA NO CREADAS








    module.exports = router;