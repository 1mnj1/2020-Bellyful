var express = require('express');
var router = express.Router();

/* GET users listing. */
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getVolunteers', function(req, res, next) {
  //sql query for the data
  sql = "select person1.person_id, CONCAT(person1.person_fname , ' ' , person1.person_lname) as 'name', person1.person_email as email, person1.person_phone as phone, CONCAT(address.add_num , ' ' , address.add_street) as 'address', CONCAT(person2.person_fname , ' ' , person2.person_lname) as 'ice'\
  from person as person1,person as person2 , volunteer , address\
  where person1.person_id = volunteer.person_id \
  AND person2.person_id = volunteer.ice_id \
  AND person1.add_id = address.add_id"
  // res.send("Got here!")
  con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send(404)
        } else {
          res.send(result)
        }
        


        // res.send("Correct!")
    });
  
});

module.exports = router;
