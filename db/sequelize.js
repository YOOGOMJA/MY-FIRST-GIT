var express = require('express');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'DEV', 
    'gomja', 
    'rhawk1202:-)', 
    {
    host: 'east-mariadb-dev.cpvfhejojors.ap-northeast-2.rds.amazonaws.com',
    port : 3306,
    dialect: 'mariadb',
    define: 
        {
            // 에러가 발생해서 추가 : 
            // Unknown column '*.createdAt' in 'field list'
            timestamps: false
        }
    }
);


module.exports = sequelize;



