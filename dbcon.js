const mysql = require('mysql')

const db = mysql.createConnection({
    connectionLimit: 10,
    host : ' ',
    user : ' ',
    password : ' ',
    port: ' ',
    database : ' '
});

exports.db = db;