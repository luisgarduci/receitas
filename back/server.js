const express = require('express');
const cors = require('cors');
const BodyParser = require('body-parser');
const sql = require('./database/mysqldb');
const dotenv = require("dotenv");
const server = express();

dotenv.config()

const port = process.env.PORT || 9090;
const ip = '127.0.0.1';

server.use(cors({
    origin: '*'
}))

server.use(BodyParser.json());

server.listen(port, ip, () => {
    console.log(`Servidor Rodando na porta ${port}`)
})

server.get('/receitas', (req, res) => {
let id_receita = req.query.id_receita;
sql.query('SELECT * FROM receita WHERE id_receita = ?', [id_receita], (error, result) => {
    res.json(result)
})
})

server.get('/ingredientes', (req, res) => {
 let id_receita = req.query.id_receita;
 sql.query('SELECT * FROM ingredientes WHERE id_receita = ?',[id_receita], (error, result) => {
    res.json(result)
 })
})

server.get('/preparo', (req, res) => {
    let id_receita = req.query.id_receita;
    sql.query('SELECT * FROM preparo WHERE id_receita = ?',[id_receita], (error, result) => {
        res.json(result)
     })
})

server.get('/quantidadeReceitas', (req, res) => {
    // Consulta feita apenas para obter a quantidade total de receitas.
    sql.query('SELECT id_receita FROM receita', (error, result) => {
        res.json(result);
    })
})


