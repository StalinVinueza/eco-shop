const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteC');

// Rutas CRUD
router.get('/clientes', clienteController.getClientes); // Obtener todos los clientes
router.get('/clientes/:id', clienteController.getClienteById); // Obtener cliente por ID
router.post('/clientes', clienteController.createCliente); // Crear un cliente
router.put('/clientes/:id', clienteController.updateCliente); // Actualizar cliente
router.delete('/clientes/:id', clienteController.deleteCliente); // Eliminar cliente

module.exports = router;
