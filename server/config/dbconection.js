const { Pool } = require('pg');

// Configuración de conexión
const pool = new Pool({
  user: 'postgres',
  host: '',
  database: 'ecoShop',
  password: '1234',

  //Stalin
  // database: 'eco_shop',
  // password: 'Romi19',
  
  port: 5432, // Puerto por defecto de PostgreSQL
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



// (async () => {
//     try {
//       const queryText = 'SELECT * FROM cliente'; // Consulta SQL
//       const res = await pool.query(queryText); // Ejecuta la consulta
//       console.log('Registros encontrados:', res.rows); // Muestra los datos
//     } catch (err) {
//       console.error('Error ejecutando la consulta:', err.stack);
//     } finally {
//       await pool.end(); // Finaliza la conexión
//     }
//   })();
