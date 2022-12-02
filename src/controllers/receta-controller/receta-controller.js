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

/* const createReceta = async (req, res) => {

    const {insumo, gramos} = req.body;
    try {
        await pool
            .query('SELECT * FROM INSUMOS WHERE INSUMO = $1', [insumo])
            .then(response => {
                if (response.rows.length > 0) {
                    res.status(400).json({Error: 'Insumo ya se encuentra registrado'});
                } else {
                    pool
                        .query(`INSERT INTO INSUMOS (GRAMOS, INSUMO) values ('${gramos}', '${insumo}') `)
                        .then(response => {
                            res.status(200).json({Res: 'Insumo agregado correctamente'});
                        })
                        .catch(err=> res.status(400).json({Error: err.message}));
                }
            })
            .catch(err=> res.status(400).json({Error: err.message}));
    } catch (e) {
        console.log(e);
    }
} */

module.exports = {
    getRecetas,
    getRecetaById
    /* creacionReceta */
}