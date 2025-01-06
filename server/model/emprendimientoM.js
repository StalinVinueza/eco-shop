// Modelo: clienteModel.js
const pool = require('../config/dbconection.js'); // Archivo de conexión

class EmprendimientoModel {
  // Obtener todos los clientes
  static async getAllEmprendimientos() {
    try {
      const result = await pool.query('SELECT * FROM EMPRENDIMIENTO');
      return result.rows;
    } catch (err) {
      throw new Error('Error al obtener los clientes: ' + err.message);
    }
  }

  // Obtener un cliente por ID
  static async getEmprendimientoById(id) {
    try {
      const result = await pool.query('SELECT * FROM EMPRENDIMIENTO WHERE ID_EMPRENDIMIENTO = $1', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al obtener el emprendimiento: ' + err.message);
    }
  }

  // Crear un nuevo cliente
  static async createEmprendimiento(emprendimiento) {
    const { nombre_emprendimento, tipo_emprendimiento, telefono_emprendimiento, direccion_emprendimiento, correo_emprendimiento, propietario_emprendimiento, ciudad, ruta_logo } = emprendimiento;
    try {
      const result = await pool.query(
       'INSERT INTO EMPRENDIMIENTO (NOMBRE_EMPRENDIMENTO, TIPO_EMPRENDIMIENTO, TELEFONO_EMPRENDIMIENTO, DIRECCION_EMPRENDIMIENTO, CORREO_EMPRENDIMIENTO, PROPIETARIO_EMPRENDIMIENTO, CIUDAD, RUTA_LOGO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [nombre_emprendimento, tipo_emprendimiento, telefono_emprendimiento, direccion_emprendimiento, correo_emprendimiento, propietario_emprendimiento, ciudad, ruta_logo]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al crear el cliente: ' + err.message);
    }
  }

  // Actualizar un cliente
  static async updateEmprendimiento(id, emprendimiento) {
    const { nombre_emprendimento, tipo_emprendimiento, telefono_emprendimiento, direccion_emprendimiento, correo_emprendimiento, propietario_emprendimiento, ciudad, ruta_logo } = emprendimiento;
    try {
      const result = await pool.query(
        'UPDATE EMPRENDIMIENTO SET NOMBRE_EMPRENDIMENTO = $1, TIPO_EMPRENDIMIENTO = $2, TELEFONO_EMPRENDIMIENTO = $3, DIRECCION_EMPRENDIMIENTO = $4, CORREO_EMPRENDIMIENTO = $5, PROPIETARIO_EMPRENDIMIENTO = $6, CIUDAD = $7, RUTA_LOGO =$8 WHERE ID_EMPRENDIMIENTO = $8 RETURNING *',
        [nombre_emprendimento, tipo_emprendimiento, telefono_emprendimiento, direccion_emprendimiento, correo_emprendimiento, propietario_emprendimiento, ciudad, ruta_logo]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al actualizar el emprendimiento: ' + err.message);
    }
  }

  // Eliminar un cliente
  static async deleteEmprendimiento(id) {
    try {
      const result = await pool.query('DELETE FROM EMPRENDIMIENTO WHERE ID_EMPRENDIMIENTO = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al eliminar el emprendimiento: ' + err.message);
    }
  }
}

module.exports = EmprendimientoModel;