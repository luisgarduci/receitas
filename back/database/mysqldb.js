const mysql = require('mysql2')

const settings = {
    host: '127.0.0.1',
    port: 3306,
    database: 'receitas',
    user: 'root',
    password: ''
}

const connection = mysql.createConnection(settings)

connection.connect((error) => {
    if(error) {
        console.log('Erro na conexão')
    }
    else {
        console.log('Conectado')
    }
})

module.exports = connection