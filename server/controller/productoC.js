const pool = require('../config/dbconection.js'); // Importar la conexión a la base de datos

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    // Consulta SQL con ORDER BY
    const result = await pool.query('SELECT * FROM PRODUCTOS ORDER BY ID_PRODUCTO');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).send('Error al obtener productos.');
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Producto no encontrado.');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener producto:', error.message);
    res.status(500).send('Error al obtener producto.');
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const {
      nombre_producto,
      costo_producto,
      stock,
      ruta_imagen,
    } = req.body;

    // Validación de campos
    if (
      !nombre_producto ||
      !costo_producto ||
      !stock ||
      !ruta_imagen
    ) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }

    const query = `
      INSERT INTO PRODUCTOS 
      (NOMBRE_PRODUCTO, COSTO_PRODUCTO, STOCK, RUTA_IMAGEN)
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;
    const values = [
      nombre_producto,
      costo_producto,
      stock,
      ruta_imagen,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.status(500).json({ error: 'Error al crear producto.' });
  }
};

// Actualizar un producto
exports.updateProducto = (req, res) => {
  const id = req.params.id;
  const {
    nombre_producto,
    costo_producto,
    stock,
    ruta_imagen,
  } = req.body;

  const sql = `
    UPDATE PRODUCTOS
    SET 
      NOMBRE_PRODUCTO = $1, 
      COSTO_PRODUCTO = $2, 
      STOCK = $3, 
      RUTA_IMAGEN = $4
    WHERE ID_PRODUCTO = $5
  `;

  pool.query(
    sql,
    [
      nombre_producto,
      costo_producto,
      stock,
      ruta_imagen,
      id
    ],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar producto:', err);
        res.status(500).send({ error: 'Error al actualizar producto' });
      } else if (result.rowCount === 0) {
        res.status(404).send({ message: 'Producto no encontrado' });
      } else {
        res.status(200).send({ message: 'Producto actualizado correctamente' });
      }
    }
  );
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Producto no encontrado.');
    }
    res.status(200).send('Producto eliminado correctamente.');
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.status(500).send('Error al eliminar producto.');
  }
};
