// server.js
const express = require('express');
const pool = require('./config/dbconection.js'); // Archivo de conexión de la base de datos
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clienteR.js'); 
const emprendimientoRoutes = require('./routes/emprendimientoR.js');
const productoRoutes = require('./routes/productoR.js');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;


const corsOptions = {
  origin: 'http://127.0.0.1:5500', 
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); 



// Middleware  JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use(clienteRoutes);
app.use(emprendimientoRoutes);
app.use(productoRoutes);


// Carpeta pública para el frontend
app.use(express.static('client'));



// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Eco-Shop!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

