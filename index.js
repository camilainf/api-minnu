const express = require('express');
const app = express();
const port = 3000
const {Pool}= require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "camila70",
    database: "web"
});

app.use(express.json());

const insumos = [
    {id:1, nombre: 'zanahoria'},
    {id:2, nombre: 'tomate'}
];

app.get('/',(req, res)=> {
    res.send('Hola mundirijillo');
});

app.get('/insumos', (req, res)=>{
    res.send(insumos);
});

app.get('/insumos/:id',(req, res)=>{
    let insumo = insumos.find(i => i.id === parseInt(req.params.id));

    if(!insumo) {
        res.status(404).send('404 no existe dicho insumo ');
    }
    
    res.send(insumo);
})

app.post('/insumos',(req, res)=>{

    if(!req.body.nombre || req.body.nombre.length < 3) {
        res.status(400).send('nombre erroneo');
    } 

    const insumo = {
        id:insumos.length + 1,
        nombre:req.body.nombre
    };

    insumos.push(insumo);
    res.send(insumo);
})

app.put('/insumos/:id', (req, res)=>{

    let insumo = insumos.find(i => i.id === parseInt(req.params.id));
    if(!insumo) {
        res.status(404).send('404 no existe dicho insumo ');
    }

    if(!req.body.nombre || req.body.nombre.length < 3) {
        res.status(400).send('nombre erroneo');
    } 

    insumo.nombre = req.body.nombre;
    res.send(insumo);
});

app.delete('/insumos/:id', (req, res)=>{
    
    let insumo = insumos.find(i => i.id === parseInt(req.params.id));
    if(!insumo) {
        res.status(404).send('404 no existe dicho insumo ');
    }

    const index = insumos.indexOf(insumo);
    insumos.splice(index,1);

    res.send(insumo);

});


app.listen(port, ()=> console.log('escuchando 3000'));

pool.query("select * from insumos",(err,res)=> {
    if(err) {
        console.log(err.stack);
    } else {
        console.log(res.rows)
    }
    pool.end;
})