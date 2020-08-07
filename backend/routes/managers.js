var express = require('express');
var router = express.Router();

/* GET users listing. */
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getVolunteer', function(req, res, next) {
  const loginDetails = [
    req.body.username,
    req.body.password,
  ]
  //sql query for the data
  sql = "select person.person_id, CONCAT(person.person_fname , ' ' , person.person_lname) as 'name', person.person_email as email, person.person_phone as phone, vol_status.VS_stat as status \
  from person , volunteer, vol_status \
  where person.person_id = volunteer.person_id AND volunteer.vol_status = vol_status.VS_id"

  con.query(sql, loginDetails, function (err, result) {
        if (err) throw err;
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send(404)
        } else {
          res.send(String(result))
        }
        


        // res.send("Correct!")
    });
  
});

module.exports = router;
