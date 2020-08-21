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
  sql = "select concat(person.person_fname,' ',person.person_lname) as 'Volunteer',concat(person2.person_fname,' ',person2.person_lname) as 'Recipient', concat(person3.person_fname,' ',person3.person_lname) as 'Referrer',delivery_status.stat_name as 'Status', mealC.meal_count as 'Meals'\
  from delivery\
   join person as person2 on person2.person_id = delivery.recipient_id\
   join person as person3 on person3.person_id = delivery.ref_id\
   join delivery_status on delivery_status.stat_id = delivery.delivery_status\
   join (SELECT COUNT(meal.delivery_id) AS meal_count, delivery.delivery_id as id FROM meal join delivery on meal.delivery_id = delivery.delivery_id group by delivery.delivery_id) as mealC on mealC.id = delivery.delivery_id\
   left join person ON person.person_id = delivery.`vol_id` "
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

router.post('/getDeliveryDetails', function(req, res, next) {
  //sql query for the data
  reQArr = req.body["type[]"]
  console.log("Request Body: ",req.body)
  console.log("Request arr Length:", Array.isArray(reQArr) ? reQArr.length : 1)
  sqlWhere = " AND ("
  for (var i = 0; i <(Array.isArray(reQArr) ? reQArr.length : 1 ); ++i ){
    sqlWhere = sqlWhere+(i==0 ? "":"OR")+" lower(delivery_status.stat_name) =  ? "
  }
  sqlWhere = sqlWhere +")"
  sql = "select concat(person.person_fname,' ',person.person_lname) as 'Name', address.add_suburb 'Suburb',delivery_type(person.person_id) as 'Delivery Type', delivery_status.stat_name as 'Delivery Status'\
  from person ,address, delivery, delivery_status\
  where person.person_id = delivery.recipient_id\
  AND person.add_id = address.add_id\
  AND delivery.delivery_status = delivery_status.stat_id"
  sql = sql + sqlWhere;
  
  // res.send("Got here!")
  con.query(sql,(Array.isArray(reQArr) ? reQArr : [reQArr]), function (err, result) {
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

router.post('/getReferrerStatus', function(req, res, next) {
  //sql query for the data
  reQArr = req.body["type[]"]
  
  const sql = "select referrer_type.RT_id, referrer_type.RT_type from referrer_type"
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





router.post('/getUnassignedDeliveries', function(req, res, next) {
  //sql query for the data
  sql = "select concat(person1.person_fname,' ',person1.person_lname) as 'Volunteer',concat(person2.person_fname,' ',person2.person_lname) as 'Recipient', concat(person3.person_fname,' ',person3.person_lname) as 'Referrer',delivery_status.stat_name as 'Status', mealC.meal_count as 'Meals'\
  from delivery, person as person1, person as person2, person as person3, delivery_status,(SELECT COUNT(meal.delivery_id) AS meal_count FROM meal, delivery where meal.delivery_id = delivery.delivery_id) as mealC\
  where delivery_status = 1\
  AND delivery_status.stat_id = delivery.delivery_status\
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

// // 
// router.post('/getUnassignedDeliveries2', function(req, res, next) {
//   console.log("getting data for unassigned deliveries 2\n");
//   //sql query for the data
//   sql = "SELECT concat(person2.person_fname,' ',person2.person_lname) AS 'Recipient', concat(pAddress.add_num, ' ', pAddress.add_street, ', ', pAddress.add_suburb) AS 'Address', person2.person_phone AS 'Phone, delivery_status.stat_name AS 'Status', mealC.meal_count AS 'Meals'\
//   FROM delivery, person AS person2, address AS pAddress, delivery_status, (SELECT COUNT(meal.delivery_id) AS meal_count FROM meal, delivery where meal.delivery_id = delivery.delivery_id) AS mealC\
//   WHERE delivery_status = 1\
//   AND delivery_status.stat_id = delivery.delivery_status\
//   AND person2.person_id = delivery.recipient_id\
//   AND pAddress.add_id = person2.add_id"
//   // res.send("Got here!")
//   con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Got a result!\n");
//         console.log(result)
//         if(result.length == 0){
//           res.send(404)
//           console.log("no results :(")
//         } else {
//           res.send(result)
//         }
//     });
// });


// router.post('/testUnassignedDeliveries', function(res, res, next) {
//   sql = "SELECT concat(person_fname, ' ', person_lname) AS 'Recipient', concat(add_num, ' ', add_street, ', ', add_suburb) AS 'Address', person_phone AS 'Phone', mealC.meal_count AS 'Meals', delivery_status.stat_name AS 'Status'\
//   FROM delivery, person, address, delivery_status, (SELECT COUNT(meal.delivery_id) AS meal_count FROM meal, delivery WHERE meal.delivery_id = delivery.delivery_id) AS mealC\
//   WHERE delivery_status = 1\
//   AND delivery_status.stat_id = delivery.delivery_status\
//   AND person_id = delivery.recipient_id\
//   AND add_id = person_id.add_id"

//   con.query(sql, function(err, result) {
//     if (err) throw err;
//     console.log("Got a result!\n");
//     console.log(result)
//     if (result.length == 0) {
//       res.send(404)
//     } else {
//       res.send(result)
//     }
//   });
// });

// router.post('/getUnassignedDeliveries2', function(req, res, next) {
//   console.log("getting data for unassigned deliveries 2\n");
//   //sql query for the data
//   sql = "SELECT concat(person2.person_fname,' ',person2.person_lname) AS 'Recipient', concat(person2.add_id.add_num, ' ', person2.add_id.add_street, ', ', person2.add_id.add_suburb) AS 'Address', delivery_status.stat_name AS 'Status', mealC.meal_count AS 'Meals'\
//   FROM delivery, person AS person2, delivery_status, (SELECT COUNT(meal.delivery_id) AS meal_count FROM meal, delivery where meal.delivery_id = delivery.delivery_id) AS mealC\
//   WHERE delivery_status = 1\
//   AND Status = 'Unassigned'\
//   AND delivery_status.stat_id = delivery.delivery_status\
//   AND person2.person_id = delivery.recipient_id\
//   AND add_id = person2.add_id"
//   // res.send("Got here!")
//   con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Got a result!\n");
//         console.log(result)
//         if(result.length == 0){
//           res.send(404)
//           console.log("no results :(")
//         } else {
//           res.send(result)
//         }
//     });
// });





module.exports = router;
