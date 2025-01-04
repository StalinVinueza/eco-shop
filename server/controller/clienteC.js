const pool = require('../dbconection.js'); // Importar la conexión a la base de datos

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM CLIENTE');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener clientes:', error.message);
        res.status(500).send('Error al obtener clientes.');
    }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM CLIENTE WHERE ID_CLIENTE = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Cliente no encontrado.');
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener cliente:', error.message);
        res.status(500).send('Error al obtener cliente.');
    }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    const { NOMBRE_CLIENTE, APELLIDO_CLIENTE, CI_CLIENTE, GENERO_CLIENTE, EDAD_CLIENTE, DIRECCION_CLIENTE, TELEFONO_CLIENTE, CORREO_CLIENTE } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO CLIENTE (NOMBRE_CLIENTE, APELLIDO_CLIENTE, CI_CLIENTE, GENERO_CLIENTE, EDAD_CLIENTE, DIRECCION_CLIENTE, TELEFONO_CLIENTE, CORREO_CLIENTE) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [NOMBRE_CLIENTE, APELLIDO_CLIENTE, CI_CLIENTE, GENERO_CLIENTE, EDAD_CLIENTE, DIRECCION_CLIENTE, TELEFONO_CLIENTE, CORREO_CLIENTE]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear cliente:', error.message);
        res.status(500).send('Error al crear cliente.');
    }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_CLIENTE, APELLIDO_CLIENTE, CI_CLIENTE, GENERO_CLIENTE, EDAD_CLIENTE, DIRECCION_CLIENTE, TELEFONO_CLIENTE, CORREO_CLIENTE } = req.body;
    try {
        const result = await pool.query(
            `UPDATE CLIENTE SET 
            NOMBRE_CLIENTE = $1, APELLIDO_CLIENTE = $2, CI_CLIENTE = $3, GENERO_CLIENTE = $4, 
            EDAD_CLIENTE = $5, DIRECCION_CLIENTE = $6, TELEFONO_CLIENTE = $7, CORREO_CLIENTE = $8
            WHERE ID_CLIENTE = $9 RETURNING *`,
            [NOMBRE_CLIENTE, APELLIDO_CLIENTE, CI_CLIENTE, GENERO_CLIENTE, EDAD_CLIENTE, DIRECCION_CLIENTE, TELEFONO_CLIENTE, CORREO_CLIENTE, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Cliente no encontrado.');
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar cliente:', error.message);
        res.status(500).send('Error al actualizar cliente.');
    }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM CLIENTE WHERE ID_CLIENTE = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Cliente no encontrado.');
        }
        res.status(200).send('Cliente eliminado correctamente.');
    } catch (error) {
        console.error('Error al eliminar cliente:', error.message);
        res.status(500).send('Error al eliminar cliente.');
    }
};
