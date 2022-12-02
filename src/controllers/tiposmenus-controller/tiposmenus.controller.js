const pool = require('../../config/db.config');

const getTiposMenus = async (req, res) => {
    const response = await pool.query('SELECT * FROM TIPOSMENUS');
    res.status(200).json(response.rows);
}

const getTipoMenuById = async (req, res) => {
    const { id }= req.params;
    const query = `select * from tiposmenus where idtipomenu = ${id}`;
    const response = await pool.query(query);
    res.status(200).json(response.rows[0]);
}

const getTipoMenuByMenuID = async ( req, res ) => {
    const { id }= req.params;
    try{
        pool
        .query(`select tiposmenus.tipomenu from menus join tiposmenus on menus.tipomenu = tiposmenus.idtipomenu where menus.idmenu = $1`,[id])
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

module.exports = {
    getTiposMenus,
    getTipoMenuById,
    getTipoMenuByMenuID
}