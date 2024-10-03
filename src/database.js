require('dotenv').config({path: 'variaveis.env'})

const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    port: 3306,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
})

connection.connect(err => {
    if(err) throw err
    console.log(`Connection to database ${process.env.BD_NAME} `)
})

module.exports = connection;