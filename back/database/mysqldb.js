const mysql = require('mysql2')

const settings = {
    host: 'sql106.infinityfree.com',
    port: 3306,
    database: 'receitas',
    user: 'if0_37238158',
    password: 'DcFO4IMDaDp1'
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
