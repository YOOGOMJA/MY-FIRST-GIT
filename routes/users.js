var express = require('express');
var router = express.Router();

var ACCOUNT = require('../db/models/accounts.js');

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
  ACCOUNT.findAll()
  .then(function(data){
    res.render('./user/list' , { title : 'USER LIST' , data : data })
  },
  function(err){
    console.log('ERR OCCURED' , err);
    res.redirect('../');
  })
});

router.post('/list' , function(req , res, next){
  // post 데이터 확인
  ACCOUNT.create({
    NAME : req.body.name,
    EMAIL : req.body.email,
    HP : req.body.hp
  }).then(function(data){
    res.redirect('./list');
  }, function(err){
    console.log('ERR OCCURED' , err);
    res.redirect('./list');
  })
});

module.exports = router;
