var mysql = require('mysql');

var connectMysql = function(){
     return mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database: 'livraria'
        });
}

module.exports = function(){
    return connectMysql;
}