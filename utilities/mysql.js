const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'phpmyadmin',
    password : 'admin',
    database : 'blog_db'
})

connection.connect( (err) => {
    if(err) throw err;
})

module.exports = connection;