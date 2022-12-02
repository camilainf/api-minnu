const pool = require('../../config/db.config');

const getTiposRecetas = async(req, res) => {
    const response = await pool.query('select * from tiposrecetas');
    res.status(200).json(response.rows);
}

const getTipoRecetaById = async (req, res) => {
    const id = req.params.id;
    try{
        pool
        .query(`select tiposrecetas.tiporeceta, tiposrecetas.idtiporeceta
                from recetas
                join tiposrecetas on recetas.tiporeceta = tiposrecetas.idtiporeceta
                where recetas.idreceta = $1`,[id])
        .then(response => {
            if(response.rows.length > 0){
                res.status(200).send(response.rows)
            }
            else{
                res.status(200).json({res:[]});
            }
        })
        .catch(err => res.status(404).json({Error: err.message}))
    }catch(e){
        next(e);
    }
}

module.exports = {
    getTiposRecetas,
    getTipoRecetaById
}