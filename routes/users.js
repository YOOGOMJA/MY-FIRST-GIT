var express = require('express');
var router = express.Router();

var db = require('../db/db.js');

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
  // db.getConnection(function(err , conn){
  //   conn.query('SELECT * FROM ACCOUNTS' , function(err , data){
  //     if(err){ console.log('POOL CONNECTION ERROR OCCURED!' , err); }

  //     console.log(data);

  //     res.render('./user/list' , { title : 'USER LIST' , data:data });

  //     conn.release();
  //   })
  // })
  db.query('SELECT * FROM ACCOUNTS')
  .done(function(data){
    res.render('./user/list' , { title : 'USER LIST' , data : data });
  })

});

router.post('/list' , function(req , res, next){
  // post 데이터 확인
  // if(util.hasPostData(req.body , 'name')){
  //   res.render('./user/list' , { title : 'USER LIST' , error : '이름이 누락되었습니다.'});
  // }
  // if(util.hasPostData(req.body , 'email')){
  //   res.render('./user/list' , { title : 'USER LIST' , error : '이메일이 누락되었습니다.'});
  // }
  // if(util.hasPostData(req.body , 'hp')){
  //   res.render('./user/list' , { title : 'USER LIST' , error : '핸드폰 번호가 누락되었습니다.'});
  // }

  var query = 'INSERT INTO ACCOUNTS (NAME , EMAIL , HP)';
  query    += ' VALUES ("' + req.body.name +'","' + req.body.email +'","' + req.body.hp +'")';
  
  db.query(query)
  .then(function(){
    // ON SUCCESSED
    return db.query('SELECT * FROM ACCOUNTS')
  },
  function(){
    // ON FAILURE
  })
  .then(function(data){
    res.render('./user/list' , { title : 'USER LIST' , data : data });
  })
  
  // db.query(query)
  // .then(function(data){
  //   // WHEN IT'S SUCCESSED
  //   console.log(data)
  //   res.render('./user/list' , { title : 'USER LIST' , data : data });
  //   //res.redirect('./list');
  // } , function(err){
  //   // WHEN IT'S FAILURE
  //   res.render('./user/list' ,{ title: 'USER LIST' , error : err});
  // })
});

// router.post("/insert" , function(req , res , next){
//   var query = "INSERT INTO ACCOUNTS (  NAME , EMAIL , HP)";
//   query +=    'VALUES ("'+ req.body.name +'" , "'+req.body.email+'", "'+req.body.hp+'")';

//   db.getConnection(function(err , conn){
//     conn.query(query , function(err , data){
//       if(err){ console.log('POOL CONNECTION ERROR OCCURED!' , err); }
//       conn.release();
//       res.redirect('./list');
//     })
//   })
//   console.log(query);
// });

module.exports = router;
