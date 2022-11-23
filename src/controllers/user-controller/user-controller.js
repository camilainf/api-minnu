const pool = require('../../config/db.config');
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const getUserByID = async (req, res) => {
    const id = req.params.id;
    const query = `select * from users where iduser = ${id}`;
    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
}

const userLogin = async (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.pass;

    try{
        await pool.query ('SELECT * FROM users where email = $1', [email]).then(
            results => {
                if(results.rows.length > 0) {
                    const user = results.rows[0];
                    bcryptjs.compare(pass, user.pass, (err, isMatch) => {
                        if(err) {
                            res.status(401).send(console.log(err.stack));
                        }

                        if(isMatch) {
                            const token = jwt.sign(user, process.env.SECRET_KEY)
                            res.status(200).send({user, token});
                        }

                        res.status(401).json({Error: 'Clave invalida'});
                    })
                } else {
                    res.status(401).send('El correo ingresado no se encuentra registrado')
                }
            }
        ).catch(err=>res.status(401).json({Error: err.message}))
    } catch(err) {
        next(e);
    }
}

const userRegister = async (req, res, next) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const pass = req.body.pass;

    console.log({nombre, email, pass});

    let hashPass = await bcryptjs.hash(pass, 10);

    try{
        await pool.query('SELECT * FROM users where email = $1', [email])
        .then(results => {
            if(results.rows.length > 0) {
                res.status(401).json({Error: 'Email ingresado ya se encuentra registrado'});
            }

            pool.query(`INSERT INTO USERS (nombre, email, pass) VALUES ($1, $2, $3)`, [nombre, email, hashPass])
            .then(results => res.status(200).send({results})).catch(
                err => res.status(401).json({Error: err.message})
            )
        }).catch(err => res.status(401).json({Error: err.message}))
    } catch(e) {
        next(e);
    }
}

module.exports = {
    getUserByID,
    userLogin,
    userRegister
}