const pool = require('../../config/db.config');

const getInsumos = async (req, res) => {
    const response = await pool.query('SELECT * FROM INSUMOS');
    res.status(200).json(response.rows);
}

const getInsumoById = async (req, res) => {
    const id = req.params.id;

    const query = `select * from insumos where idinsumo = ${id}`;

    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
}

const getInsumoByRecipeId = async (req, res) => {
    const id = req.params.id;
    try{
        console.log(id)
        pool
        .query(`select insumos.insumo, insumos.idinsumo, insumos.gramos from detallereceta join insumos on insumos.idinsumo = detallereceta.insumo where detallereceta.receta = $1`,[id])
        .then(response => {
            console.log('ola')
            console.log(response.rows)
            if(response.rows.length > 0){
                res.status(200).json({res:response.rows})
            }
            else{
                res.status(200).json({res:[]});
            }
        })
        .catch(err => res.status(401).json({Error: err.message}))
    } catch(e){
        console.log(e);
    }
}

const createInsumo = async (req, res) => {

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
}

const deleteInsumoById = async (req, res) => {
    const idinsumo = req.body.id;

    const query = `DELETE FROM INSUMOS WHERE IDINSUMO = ${idinsumo} RETURNING INSUMO`;

    try {
        await pool
            .query (query)
            .then(response => {
                console.log(response.rows)
                if (response.rows.length > 0) {
                    res.status(200).json({res: 'Insumo eliminado exitosamente'});
                } else {
                    res.status(401).json({res:'No se encuentra el insumo'})
                }
            })
            .catch(err => res.status(401).json({Error:err.message}))
    } catch(e){
        console.log(e);
    } 
}

const editInsumo = (req,res) => {
    const {idinsumo, insumo, gramos} = req.body;
    try{
        pool
            .query('SELECT * FROM INSUMOS WHERE IDINSUMO = $1',[idinsumo])
            .then(response => {
                if(response.rows.length > 0){
                    pool
                        .query('UPDATE INSUMOS SET INSUMO = $1, GRAMOS = $2 WHERE IDINSUMO = $3 RETURNING *',[insumo,gramos, idinsumo])
                        .then(response => {
                            res.status(401).json({Res:'Insumo actualizado exitosamente',Insumo:response.rows[0]})
                        })
                        .catch(err => res.status(400).json({Error:err.message}))  
                }
                else{
                    res.status(400).json({Error: 'El insumo buscado no existe'});
                }
            })
            .catch(err => res.status(400).json({Error:err.message}))
    }catch(e){
        console.log(e);
    }
}

module.exports = {
    getInsumos,
    createInsumo,
    deleteInsumoById,
    editInsumo,
    getInsumoByRecipeId,
    getInsumoById
}