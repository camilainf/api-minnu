const pool = require('../../config/db.config');

const getInsumos = async (req, res) => {
    const response = await pool.query('SELECT * FROM INSUMOS');
    res.status(200).json(response.rows);
}

const getInsumoById = async (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM INSUMOS WHERE IDINSUMO = ${id}`;

    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
}

const createInsumo = async (req, res) => {
    const insumo = req.body.insumo;
    const gramos = req.body.gramos;

    pool.query (
        'SELECT * FROM INSUMOS WHERE INSUMO = $1', [insumo],
        (err, results) => {
            if (err) {
                res.status(401).send(console.log(err.stack));
            } else {
                if (results.rows.length > 0) {
                    res.status(400).send('Insumo ya se encuentra registrado');
                } else {
                    pool.query(
                        `INSERT INTO INSUMOS (GRAMOS, INSUMO) values ('${gramos}', '${insumo}') `,
                        (err, results) => {
                            if (err) {
                                res.status(401).send(console.log(err.stack));
                            } else {
                                res.status(200).send('Insumo agregado con exito!');
                            }
                        }
                    )
                }
            }
        }
    )
}

const deleteInsumoById = async (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM INSUMOS WHERE IDINSUMO = ${id}`;

    pool.query (
        query,
        (err, results) => {
            console.log(results);
            if (err) {
                res.status(401).send(console.log(err.stack));
            } else {
                if(results.rowCount > 0) {
                    res.status(200).send('Insumo eliminado con exito!');
                } else {
                    res.status(404).send('No existe dicho insumo');
                }
                
            }
        }
    )
}

module.exports = {
    getInsumos,
    getInsumoById,
    createInsumo,
    deleteInsumoById
}