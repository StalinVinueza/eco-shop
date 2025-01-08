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

// Rutas existentes
app.use(clienteRoutes);
app.use(emprendimientoRoutes);
app.use(productoRoutes);

// Carpeta pública para el frontend
app.use(express.static('client'));

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor Eco-Shop!');
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.query(query, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta de registro
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    const [existingUser] = await pool.query(checkUserQuery, [username]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await pool.query(insertQuery, [username, password]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
