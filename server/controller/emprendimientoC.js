const pool = require('../config/dbconection.js'); // Importar la conexión a la base de datos

// Obtener todos los emprendimientos
exports.getEmprendimientos = async (req, res) => {
  try {
    // Consulta SQL con ORDER BY
    const result = await pool.query('SELECT * FROM EMPRENDIMIENTO ORDER BY ID_EMPRENDIMIENTO');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener emprendimientos:', error.message);
    res.status(500).send('Error al obtener emprendimientos.');
  }
};

// Obtener un emprendimiento por ID
exports.getEmprendimientoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM EMPRENDIMIENTO WHERE ID_EMPRENDIMIENTO = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Emprendimiento no encontrado.');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener emprendimiento:', error.message);
    res.status(500).send('Error al obtener emprendimiento.');
  }
};

// Crear un nuevo emprendimiento
exports.createEmprendimiento = async (req, res) => {
  try {
    const {
      nombre_emprendimento,
      tipo_emprendimiento,
      telefono_emprendimiento,
      direccion_emprendimiento,
      correo_emprendimiento,
      propietario_emprendimiento,
      ciudad,
      ruta_logo,
    } = req.body;

    // Validación de campos
    if (
      !nombre_emprendimento ||
      !tipo_emprendimiento ||
      !telefono_emprendimiento ||
      !direccion_emprendimiento ||
      !correo_emprendimiento ||
      !propietario_emprendimiento ||
      !ciudad ||
      !ruta_logo
    ) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const query = `
      INSERT INTO EMPRENDIMIENTO 
      (NOMBRE_EMPRENDIMENTO, TIPO_EMPRENDIMIENTO, TELEFONO_EMPRENDIMIENTO, DIRECCION_EMPRENDIMIENTO, 
      CORREO_EMPRENDIMIENTO, PROPIETARIO_EMPRENDIMIENTO, CIUDAD, RUTA_LOGO)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`;
    const values = [
      nombre_emprendimento,
      tipo_emprendimiento,
      telefono_emprendimiento,
      direccion_emprendimiento,
      correo_emprendimiento,
      propietario_emprendimiento,
      ciudad,
      ruta_logo,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear emprendimiento:', error.message);
    res.status(500).json({ error: 'Error al crear emprendimiento.' });
  }
};

// Actualizar un emprendimiento
exports.updateEmprendimiento = (req, res) => {
  const id = req.params.id;
  const {
    nombre_emprendimento,
    tipo_emprendimiento,
    telefono_emprendimiento,
    direccion_emprendimiento,
    correo_emprendimiento,
    propietario_emprendimiento,
    ciudad,
    ruta_logo,
  } = req.body;

  const sql = `
    UPDATE EMPRENDIMIENTO
    SET 
      NOMBRE_EMPRENDIMENTO = $1, 
      TIPO_EMPRENDIMIENTO = $2, 
      TELEFONO_EMPRENDIMIENTO = $3, 
      DIRECCION_EMPRENDIMIENTO = $4,
      CORREO_EMPRENDIMIENTO = $5,
      PROPIETARIO_EMPRENDIMIENTO = $6,
      CIUDAD = $7,
      RUTA_LOGO = $8
    WHERE ID_EMPRENDIMIENTO = $9
  `;

  pool.query(
    sql,
    [
      nombre_emprendimento,
      tipo_emprendimiento,
      telefono_emprendimiento,
      direccion_emprendimiento,
      correo_emprendimiento,
      propietario_emprendimiento,
      ciudad,
      ruta_logo,
      id
    ],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar emprendimiento:', err);
        res.status(500).send({ error: 'Error al actualizar emprendimiento' });
      } else if (result.rowCount === 0) {
        res.status(404).send({ message: 'Emprendimiento no encontrado' });
      } else {
        res.status(200).send({ message: 'Emprendimiento actualizado correctamente' });
      }
    }
  );
};

// Eliminar un emprendimiento
exports.deleteEmprendimiento = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM EMPRENDIMIENTO WHERE ID_EMPRENDIMIENTO = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Emprendimiento no encontrado.');
    }
    res.status(200).send('Emprendimiento eliminado correctamente.');
  } catch (error) {
    console.error('Error al eliminar emprendimiento:', error.message);
    res.status(500).send('Error al eliminar emprendimiento.');
  }
};
