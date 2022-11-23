const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

app.use(cors());

app.use(express.json());

app.use(require('./src/routes/routes'));

app.listen(process.env.LOCAL_PORT, ()=> console.log(`escuchando ${process.env.LOCAL_PORT}`));