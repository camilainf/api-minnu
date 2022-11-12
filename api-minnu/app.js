const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000

app.use(cors());

app.use(express.json());

app.use(require('./src/routes/index'));

app.listen(port, ()=> console.log('escuchando 3000'));