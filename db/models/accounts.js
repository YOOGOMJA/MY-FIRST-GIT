var sequelize = require('../sequelize.js');
var Sequelize = require('sequelize');

// 후에 VALIDATION도 여기서 처리할것 
module.exports = sequelize.define('ACCOUNTS', 
    {
        ACCOUNTNO : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        NAME : {
            type : Sequelize.STRING,  
            allowNull : false      
        },
        EMAIL : {
            type : Sequelize.STRING,
            allowNull : true
        },
        HP : {
            type : Sequelize.STRING,
            allowNull : true
        }
    },
    {
        freezeTableName : true
    }
);

