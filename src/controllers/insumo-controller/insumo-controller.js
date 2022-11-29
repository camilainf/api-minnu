const pool = require('../../config/db.config');

const getInsumos = async (req, res) => {
    const response = await pool.query('SELECT * FROM INSUMOS');
    res.status(200).json(response.rows);
}

const getInsumoById = async (req, res) => {
    const idinsumo = req.params.id;

    const query = `SELECT * FROM INSUMOS WHERE IDINSUMO = ${idinsumo}`;

    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
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
    getInsumoById,
    createInsumo,
    deleteInsumoById,
    editInsumo
}