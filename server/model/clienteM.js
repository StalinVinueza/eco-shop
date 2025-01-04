// Modelo: clienteModel.js
const pool = require('../config/dbconection.js'); // Archivo de conexión

class ClienteModel {
  // Obtener todos los clientes
  static async getAllClientes() {
    try {
      const result = await pool.query('SELECT * FROM CLIENTE');
      return result.rows;
    } catch (err) {
      throw new Error('Error al obtener los clientes: ' + err.message);
    }
  }

  // Obtener un cliente por ID
  static async getClienteById(id) {
    try {
      const result = await pool.query('SELECT * FROM CLIENTE WHERE ID_CLIENTE = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al obtener el cliente: ' + err.message);
    }
  }

  // Crear un nuevo cliente
  static async createCliente(cliente) {
    const { nombre, apellido, ci, genero, edad, direccion, telefono, correo } = cliente;
    try {
      const result = await pool.query(
        'INSERT INTO CLIENTE (NOMBRE_CLIENTE, APELLIDO_CLIENTE, CI_CLIENTE, GENERO_CLIENTE, EDAD_CLIENTE, DIRECCION_CLIENTE, TELEFONO_CLIENTE, CORREO_CLIENTE) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [nombre, apellido, ci, genero, edad, direccion, telefono, correo]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al crear el cliente: ' + err.message);
    }
  }

  // Actualizar un cliente
  static async updateCliente(id, cliente) {
    const { nombre, apellido, ci, genero, edad, direccion, telefono, correo } = cliente;
    try {
      const result = await pool.query(
        'UPDATE CLIENTE SET NOMBRE_CLIENTE = $1, APELLIDO_CLIENTE = $2, CI_CLIENTE = $3, GENERO_CLIENTE = $4, EDAD_CLIENTE = $5, DIRECCION_CLIENTE = $6, TELEFONO_CLIENTE = $7, CORREO_CLIENTE = $8 WHERE ID_CLIENTE = $9 RETURNING *',
        [nombre, apellido, ci, genero, edad, direccion, telefono, correo, id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al actualizar el cliente: ' + err.message);
    }
  }

  // Eliminar un cliente
  static async deleteCliente(id) {
    try {
      const result = await pool.query('DELETE FROM CLIENTE WHERE ID_CLIENTE = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al eliminar el cliente: ' + err.message);
    }
  }
}

module.exports = ClienteModel;
