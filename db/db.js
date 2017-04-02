var express = require('express');
var mysql = require('mysql');
var q = require('q');

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

module.exports = {
    pool : (function(){ return pool })(),
    query : function(query){
        var deferred = q.defer();
        pool.getConnection(function(err , conn){
            if(err){ console.log('DB CONNECTION ERR OCCURRED!!' , err); 
                deferred.reject(err);
            }
            conn.query(query , function(e,data){
                if(e){ 
                    console.log('DB QUERY ERR OCCURRED' , e);
                    deferred.reject(e);
                }
                conn.release();
                console.log('CHECK HERE=======================')
                console.log(arguments);
                console.log('CHECK HERE=======================')
                deferred.resolve(data);
            });
        });
        return deferred.promise;
    }
}