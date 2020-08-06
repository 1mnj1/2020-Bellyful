var express = require('express');
var router = express.Router();

/* GET users listing. */
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  const loginDetails = [
    req.body.username,
    req.body.password,
  ]
  //sql query for the data
  sql = "select person.person_email , login.login_password, login.user_level  from person ,login  where person_email = ?   AND person_phone = login.login_id AND login.login_password = ?"
  
  
  con.query(sql, loginDetails, function (err, result) {
        if (err) throw err;
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send("0")
        } else {
          res.send(String(result[0]["user_level"]))
        }
        


        // res.send("Correct!")
    });
  
});

module.exports = router;
