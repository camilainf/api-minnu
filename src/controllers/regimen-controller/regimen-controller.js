const pool = require('../../config/db.config');

const getRegimenes = async (req, res) => {
    const response = await pool.query('select * from regimenes');
    res.status(200).json(response.rows);
}

const getRegimenById = async (req, res) => {
    const id = req.params.id;

    const query = `select * from regimenes where idregimen = ${id}`;

    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
}

const getRegimenByMenuId = async ( req, res ) => {
    const { id }= req.params;
    try{
        pool
        .query(`select regimenes.regimen from menus join regimenes on menus.regimen = regimenes.idregimen where menus.idmenu = $1`,[id])
        .then(response => {
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

const agregarRegimen = async (req, res) => {
    const regimen = req.body.regimen;

    pool.query (
        'SELECT * FROM regimenes where regimen = $1', [regimen],
        (err, results) => {
            if (err) {
                res.status(401).send(console.log(err.stack));
            } else {
                if (results.rows.length > 0) {
                    res.status(400).send('Regimen ya se encuentra registrado');
                } else {
                    pool.query(
                        `insert into regimenes (regimen) values ('${regimen}') `,
                        (err, results) => {
                            if (err) {
                                res.status(401).send(console.log(err.stack));
                            } else {
                                res.status(200).send('Regimen agregado con exito!');
                            }
                        }
                    )
                }
            }
        }
    )
}

const eliminarRegimenById = async (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM REGIMENES WHERE IDREGIMEN = ${id}`;
    
    pool.query (
        query,
        (err, results) => {
            console.log(results);
            if (err) {
                res.status(401).send(console.log(err.stack));
            } else {
                if(results.rowCount > 0) {
                    res.status(200).send('Regimen eliminado con exito!');
                } else {
                    res.status(404).send('No existe dicho regimen.');
                }
                
            }
        }
    )
}

module.exports = {
    getRegimenes,
    getRegimenById,
    agregarRegimen,
    eliminarRegimenById,
    getRegimenByMenuId
}