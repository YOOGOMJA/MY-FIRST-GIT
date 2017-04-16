var express =  require('express');
var mysql = require('mysql');
var q = require('q');

var db = {
    connect : function(){
        var conn = mysql.createConnection({
            host : 'east-mariadb-dev.cpvfhejojors.ap-northeast-2.rds.amazonaws.com',
            port : 3306,
            user : 'gomja',
            password : 'rhawk1202:-)',
            database : 'DEV'
        });

        var deferred = q.defer();

        conn.connect(function(err){
            if(err){ 
                deferred.reject(err);
            }
            else{
                deferred.resolve(conn);
            }
        })

        
        return deferred.promise;
    },
    // transaction 
    tran : function(){
        var deferred = q.defer();
        
        this.connect().then(function(conn){
           conn.beginTransaction(function(err){
               if(err) { 
                   deferred.reject(err);
                   conn.rollback(function(e){
                        console.log('FATAL!! ROLLBACK ERROR OCCURRED');
                        throw e;
                   });
               }
               // when all works finish, commit transaction
               deferred.resolve(conn);
           }) 
        } , function(e){ 
            deferred.reject(e);
        });

        return deferred.promise;
    },    
    // without transaction
    query : function(query, conn){
        var deferred = q.defer();

        if(!conn){
            db.connect()
            .then(function(connection){
                connection.query(query , function(e, data){
                    if(e){ deferred.reject(e); }
                    else{ 
                        deferred.resolve(data);
                        console.log(data);
                    }
                })                
            } , function(err){
                deferred.reject(err);
            })
        }
        else{            
            conn.query(query , function(e, data){
                if(e){ deferred.reject(e); }
                else{ 
                    deferred.resolve(data);
                }
            });
        }

        return deferred.promise;
    },
    queryWithTransaction : function(query){
        var deferred = q.defer();

        db.tran()
        .then(function(conn){
            db.query(query , conn).
            then(function(data){ 
                conn.commit(function(err){
                    if(err){ deferred.reject(err); }

                    deferred.resolve(data);
                });
            } , function(err){ 
                conn.rollback();
                deferred.reject(err); 
            })
        } , function(err){ 
            deferred.reject(err); 
        });


        return deferred.promise;
    }
}

module.exports = db;