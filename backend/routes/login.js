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
  sql = "select person_user_level, person_id from person   where person_email = ? and person_pass = ?"

  con.query(sql, loginDetails, function (err, result) {
        if (err) throw err;
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send("0")
        } else {
          res.send([String(result[0]["person_user_level"]), String(result[0]["person_id"])])
        }
        


        // res.send("Correct!")
    });
  
});

module.exports = router;
