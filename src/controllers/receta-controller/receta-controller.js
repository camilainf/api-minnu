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

/* const creacionReceta = async (req, res) => {
    const receta = req.body.receta;
    const pass = req.body.pass;

    pool.query (
        'SELECT * FROM users where email = $1', [email],
        (err, results) => {
            if (err) {
                res.status(401).send(console.log(err.stack));
            } else {
                //console.log(results.rows[0]);
                //console.log('CANTIDAD DE RESULTADOS ' + results.rows.length)
                if (results.rows.length > 0) {
                    const user = results.rows[0];

                    if (pass == user.pass) {
                        res.status(200).json(user);
                    } else {
                        res.status(401).send('Clave invalida');
                    }

                } else {
                    res.status(404).send('Email no registrado');
                }
            }
        }
    )
} */

module.exports = {
    getRecetas,
    getRecetaById
    /* creacionReceta */
}