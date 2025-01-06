const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteC');

// Rutas CRUD
router.get('/cliente', clienteController.getClientes); // Obtener todos los clientes
router.get('/cliente/:id', clienteController.getClienteById); // Obtener cliente por ID
router.post('/cliente', clienteController.createCliente); // Crear un cliente
router.put('/cliente/:id', clienteController.updateCliente); // Actualizar cliente
router.delete('/cliente/:id', clienteController.deleteCliente); // Eliminar cliente








module.exports = router;

