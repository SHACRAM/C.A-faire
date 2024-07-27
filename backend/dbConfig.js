const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Sebastien',
    password: 'A@49nPg0?', 
    database: 'CAfaire',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

module.exports = connection;


