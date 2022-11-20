const pool = require('../config/db.config');

const getMenu = async (req, res) => {
    const response = await pool.query('select * from menus');
    res.status(200).json(response.rows);
}

const getMenuById = async (req, res) => {
    const id = req.params.id;

    const query = `select * from menus where idmenu = ${id}`;

    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
}

module.exports = {
    getMenu,
    getMenuById,
}