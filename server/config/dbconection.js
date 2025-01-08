const { Pool } = require('pg');

// Configuración de conexión
const pool = new Pool({
  user: 'postgres',
  host: '',
  // database: 'ecoShop',
  // password: '1234',

  //Stalin
  database: 'eco',
  password: 'Lemat5555.',
  
  port: 5433, // Puerto por defecto de PostgreSQL
});


// Verificar conexión
pool.connect((err, client, release) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.stack);
    } else {
      console.log('Conectado a la base de datos PostgreSQL Eco - Shop :V');
    }
    release(); // Liberar el cliente después de verificar la conexión
  });
  
  module.exports = pool;
// Consulta de ejemplo
// (async () => {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log('Hora actual:', res.rows[0].now);
//   } catch (err) {
//     console.error('Error ejecutando la consulta:', err);
//   } finally {
//     await pool.end(); // Finaliza la conexión
//   }
// })();

