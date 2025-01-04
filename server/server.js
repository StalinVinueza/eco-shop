const express = require('express');
const pool = require('./config/dbconection.js'); // Archivo de conexión de la base de datos
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clienteR.js'); 

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba para verificar la conexión a la base de datos



app.use( clienteRoutes); // Rutas de clientes

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Eco-Shop!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
