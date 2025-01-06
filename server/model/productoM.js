// Modelo: clienteModel.js
const pool = require('../config/dbconection.js'); // Archivo de conexión

class ProductoModel {
  // Obtener todos los clientes
  static async getAllProductos() {
    try {
      const result = await pool.query('SELECT * FROM PRODUCTOS');
      return result.rows;
    } catch (err) {
      throw new Error('Error al obtener los productos: ' + err.message);
    }
  }

  // Obtener un cliente por ID
  static async getProductoById(id) {
    try {
      const result = await pool.query('SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al obtener el producto: ' + err.message);
    }
  }

  // Crear un nuevo cliente
  static async createProducto(producto) {
    const { nombre_producto, costo_producto, stock, ruta_imagen } = producto;
    try {
      const result = await pool.query(
       'INSERT INTO PRODUCTOS (NOMBRE_PRODUCTO, COSTO_PRODUCTO, STOCK, RUTA_IMAGEN) VALUES ($1, $2, $3, $4) RETURNING *',
        [ nombre_producto, costo_producto, stock, ruta_imagen ]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al crear el producto: ' + err.message);
    }
  }

  // Actualizar un cliente
  static async updateProducto(id, producto) {
    const { nombre_producto, costo_producto, stock, ruta_imagen } = producto;
    try {
      const result = await pool.query(
        'UPDATE PRODUCTOS SET NOMBRE_PRODUCTO = $1, COSTO_PRODUCTO = $2, STOCK = $3, RUTA_IMAGEN = $4 WHERE ID_PRODUCTO = $5 RETURNING *',
        [nombre_producto, costo_producto, stock, ruta_imagen]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al actualizar el producto: ' + err.message);
    }
  }

  // Eliminar un cliente
  static async deleteProducto(id) {
    try {
      const result = await pool.query('DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al eliminar el producto: ' + err.message);
    }
  }
}

module.exports = ProductoModel;