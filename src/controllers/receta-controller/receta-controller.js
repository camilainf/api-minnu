const pool = require('../../config/db.config');

const getRecetas = async (req, res) => {
    const response = await pool.query('select * from recetas');
    res.status(200).json(response.rows);
}

const getRecetaById = async (req, res) => {
    const id = req.params.id;

    const query = `select * from recetas where idreceta = ${id}`;

    const response = await pool.query(query);
    res.status(200).json(response.rows);
}

module.exports = {
    getRecetas,
    getRecetaById
    /* creacionReceta */
}