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
  sql = "select CONCAT(person1.person_fname , ' ' , person1.person_lname) as 'Name', person1.person_email as Email, person1.person_phone as Phone, CONCAT(address.add_num , ' ' , address.add_street) as 'Address', CONCAT(person2.person_fname , ' ' , person2.person_lname) as 'Ice'\
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
    });
});
router.post('/getDeliveries', function(req, res, next) {
  //sql query for the data
  sql = "SELECT concat(person1.person_fname,' ',person1.person_lname) as \"Volunteer\",concat(person2.person_fname,' ',person2.person_lname) as \"Recipient\", concat(person3.person_fname,' ',person3.person_lname) as \"Referrer\", mealC.meal_count as \"Meals\"\
  FROM delivery, person as person1, person as person2, person as person3, (SELECT COUNT(meal.delivery_id) AS meal_count FROM meal, delivery where meal.delivery_id = delivery.delivery_id) as mealC\
  WHERE person1.person_id = delivery.vol_id\
  AND person2.person_id = delivery.recipient_id\
  AND person3.person_id = delivery.ref_id"
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
    });
});
router.post('/getFreezerManager', function(req, res, next) {
  //sql query for the data
  sql = "select CONCAT(person.person_fname , ' ' , person.person_lname) as 'Name' ,CONCAT(address.add_num , ' ' , address.add_street) as 'Address', branch.branch_name as Branch, COUNT(meal.meal_id) as 'Available Meals'\
  from freezer,person , address, branch, meal\
  where freezer.person_id = person.person_id\
  AND freezer.add_id = address.add_id\
  AND freezer.branch_id = branch.branch_id\
  AND meal.delivery_id is NULL \
  and meal.freezer_id\
    "
  //returns id, name, address, branch name
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
    });
  
});
module.exports = router;