const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clienteC');

// Rutas CRUD
router.get('/cliente', clienteController.getClientes); // Obtener todos los clientes
router.get('/clientes/:id', clienteController.getClienteById); // Obtener cliente por ID
router.post('/clientes', clienteController.createCliente); // Crear un cliente
router.put('/clientes/:id', clienteController.updateCliente); // Actualizar cliente
router.delete('/clientes/:id', clienteController.deleteCliente); // Eliminar cliente

module.exports = router;
