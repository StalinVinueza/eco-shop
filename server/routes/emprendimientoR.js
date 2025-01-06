const express = require('express');
const router = express.Router();
const emprendimientoController = require('../controller/emprendimientoC');

// Rutas CRUD para los emprendimientos
router.get('/emprendimiento', emprendimientoController.getEmprendimientos); // Obtener todos los emprendimientos
router.get('/emprendimiento/:id', emprendimientoController.getEmprendimientoById); // Obtener emprendimiento por ID
router.post('/emprendimiento', emprendimientoController.createEmprendimiento); // Crear un emprendimiento
router.put('/emprendimiento/:id', emprendimientoController.updateEmprendimiento); // Actualizar emprendimiento
router.delete('/emprendimiento/:id', emprendimientoController.deleteEmprendimiento); // Eliminar emprendimiento

module.exports = router;

