const pool = require('../config/db.config');

const getInsumos = async (req, res) => {
    const response = await pool.query('select * from insumos');
    res.status(200).json(response.rows);
}

const getInsumoById = async (req, res) => {
    const id = req.params.id;

    const query = `select * from insumos where idinsumo = ${id}`;

    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
}

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
    getInsumos,
    getRecetas,
    getInsumoById,
    getRecetaById
}

/* const getRecetaById = async (req, res) => {
    const idreceta = req.params.id;

    const query = `select recetas.receta,insumos.insumo as ingrediente from detallereceta join recetas on detallereceta.receta = recetas.idreceta join insumos on detallereceta.insumo = insumos.idinsumo where detallereceta.receta = ${idreceta} `

    const response = await pool.query(query);
    res.status(200).json(response.rows);

}*/
