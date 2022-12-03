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

const crearNuevaReceta = async (req,res,next) => {
    const {
        nombre,
        idTipoReceta,
        insumos,
    } = req.body
    let idReceta = 0;
    try{
        await pool
            .query(`INSERT INTO recetas (receta, tiporeceta) VALUES ($1, $2) RETURNING idreceta`,[nombre,idTipoReceta])
            .then(results => {
                idReceta = results.rows[0].idreceta;
                for(let i in insumos){    
                    pool
                        .query(`INSERT INTO detallereceta (receta,insumo)VALUES ($1, $2)`,[idReceta,insumos[i]])
                        .then(results => {
                            console.log(`insumo ${i}: ${insumos[i]} insertado a la receta`);
                        })
                        .catch(err => {
                            console.log(err.message)
                        })
                }
                res.status(200).json({res:'Insersion exitosa'});
            })
            .catch(err => {
                console.log(err);
            })
    }catch(err){
        console.log(err);
    }
}

const eliminarReceta = ( req, res ) => {
    const { idreceta } = req.body;
    try{
        pool
            .query('DELETE FROM recetas WHERE idreceta = $1 RETURNING receta',[idreceta])
            .then( response => {
                console.log( response.rows )
                if ( response.rows.length > 0) {
                    res.status(200).json({res: 'Receta eliminada exitosamente'});
                }
                else{
                    res.status(404).json({res:'No se encuentra la receta'})
                }
            })
            .catch(err => res.status(400).json({Error:err.message}))
    }catch(error){
        console.log(error);
    }
}

const editarReceta = ( req, res ) => {
    const { idreceta, receta, tiporeceta } = req.body;
    try{
        pool
            .query('Update recetas set receta = $2, tiporeceta = $3 WHERE idreceta = $1 RETURNING receta',[idreceta, receta, tiporeceta])
            .then( response => {
                console.log( response.rows )
                if ( response.rows.length > 0) {
                    res.status(200).json({res: 'Receta editada exitosamente'});
                }
                else{
                    res.status(404).json({res:'No se encuentra la receta'})
                }
            })
            .catch(err => res.status(400).json({Error:err.message}))
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getRecetas,
    getRecetaById,
    crearNuevaReceta,
    eliminarReceta,
    editarReceta
}