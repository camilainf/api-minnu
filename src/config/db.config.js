const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER_DB,
    port: process.env.PORT,
    password: process.env.PASS_DB,
    database: process.env.DATABASE_NAME
});

module.exports = pool