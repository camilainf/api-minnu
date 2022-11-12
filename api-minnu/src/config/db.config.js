const {Pool} = require('pg')

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "camila70",
    database: "web"
});

module.exports = pool