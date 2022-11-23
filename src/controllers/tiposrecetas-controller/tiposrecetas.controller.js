const pool = require('../../config/db.config');

const getTiposRecetas = async(req, res) => {
    const response = await pool.query('select * from tiposrecetas');
    res.status(200).json(response.rows);
}

const getTipoRecetaById = async (req, res) => {
    const id = req.params.id;
    const query = `select * from tiposrecetas where idtiporeceta = ${id}`;
    const response = await pool.query(query);
    res.status(200).json(response.rows);
}

module.exports = {
    getTiposRecetas,
    getTipoRecetaById
}