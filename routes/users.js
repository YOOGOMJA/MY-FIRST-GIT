var express = require('express');
var router = express.Router();

var db = require('../db/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list' , function(req , res , next){
  db.getConnection(function(err , conn){
    conn.query('SELECT * FROM ACCOUNTS' , function(err , data){
      if(err){ console.log('POOL CONNECTION ERROR OCCURED!' , err); }

      console.log(data);

      res.render('./user/list' , { title : 'USER LIST' , data:data });

      conn.release();
    })
  })
})

module.exports = router;
