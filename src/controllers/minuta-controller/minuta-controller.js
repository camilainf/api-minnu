const pool = require('../config/db.config');

const getMinuta = async (req, res) => {
    const response = await pool.query('select * from minutas');
    res.status(200).json(response.rows);
}

const getMinutaById = async (req, res) => {
    const {id} = req.params;
    const query = `select * from minutas where idminuta = ${id}`;
    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
}

module.exports = {
    getMinuta,
    getMinutaById,
}
