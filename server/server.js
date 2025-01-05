// server.js
const express = require('express');
const methodOverride = require('method-override');
const pool = require('./config/dbconection.js'); // Archivo de conexión de la base de datos
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clienteR.js'); 
const path = require('path');
const cors = require('cors'); // Importar CORS

const app = express();
const PORT = 3000;


const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Asegúrate de que la URL de origen coincida exactamente
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Habilitar CORS con configuración personalizada



// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas de clientes
app.use(clienteRoutes); // Ya manejas las rutas en clienteR.j
// // Rutas
// app.use('/cliente', clienteRoutes); // Rutas del cliente

// Carpeta pública para el frontend
app.use(express.static('client'));


// app.set('view engine', 'ejs');
// app.set('views', './client/views');  

// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'client/views')));

// Rutas de clientes
app.use(clienteRoutes); // Ya manejas las rutas en clienteR.js

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Eco-Shop!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

