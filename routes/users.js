var express = require('express');
var router = express.Router();

//var db = require('../db/db.js');
var db = require('../db/database.js');

var util = {
  hasPostData : function(name , body){
    return (body[name] && body[name] !="")
  } 
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list' , function(req , res , next){
  
  db.query('SELECT * FROM ACCOUNTS')
  .then(function(data){
      res.render('./user/list' , { title : 'USER LIST' , data : data });
  })
});

router.post('/list' , function(req , res, next){
  // post 데이터 확인
  
  var query = 'INSERT INTO ACCOUNTS (NAME , EMAIL , HP)';
  query    += ' VALUES ("' + req.body.name +'","' + req.body.email +'","' + req.body.hp +'")';
  
  db.queryWithTransaction(query)
  .then(function(result){
    res.redirect('./list');  
  })
  
});

module.exports = router;
