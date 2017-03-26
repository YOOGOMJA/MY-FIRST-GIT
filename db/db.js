var express = require('express');
var mysql = require('mysql');

// var conn = mysql.createConnection({
//   host : 'east-mariadb-dev.cpvfhejojors.ap-northeast-2.rds.amazonaws.com',
//   port : 3306,
//   user : 'gomja',
//   password : 'rhawk1202:-)',
//   database : 'DEV'
// });

var pool= mysql.createPool({
    host : 'east-mariadb-dev.cpvfhejojors.ap-northeast-2.rds.amazonaws.com',
    port : 3306,
    user : 'gomja',
    password : 'rhawk1202:-)',
    database : 'DEV'
});

pool.on('error' , function(){
    console.log("DATABASE CONNECTION ERROR OCCURRED");

})

module.exports = pool;