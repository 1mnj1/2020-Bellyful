var express = require('express');
var router = express.Router();
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.post('/getNewDeliveries', function(req, res, next) {

var sql =  "SELECT delivery.delivery_id AS id, concat(person.person_fname, ' ', person.person_lname) AS name, concat(address.add_num , ' ' , address.add_street,', ', address.add_suburb) AS street, person.person_phone AS phone, (recipient.rec_children_under_5+ recipient.rec_children_between_5_10+ recipient.rec_children_between_11_17+ recipient.rec_adults) as meals, person.person_email AS email\
  FROM delivery\
  JOIN person on delivery.recipient_id = person.person_id\
  JOIN address on address.add_id = person.add_id\
  JOIN delivery_status on delivery.delivery_status = delivery_status.stat_id\
  JOIN recipient on recipient.person_id = person.person_id \
  WHERE delivery_status.stat_name like \"Unassigned\"\
  GROUP BY delivery.delivery_id\
  ORDER BY delivery.delivery_id\
   "

con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
  })
})

// Gets the number of avaiable meals for all freezers and branches
router.post('/getFreezerLog', function(req, res, next) {
  //sql query for the data
  sql = "SELECT M.meal_type AS 'Meal Type Id', MT.meal_type AS Dish , count(M.meal_type) AS 'Available Meals'\
  FROM `meal` AS M\
  JOIN meal_type AS MT ON M.meal_type = MT.MT_id\
  WHERE M.delivery_id is null\
  GROUP by M.meal_type"
  //returns meal type id, meal type name, and available meals
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

router.post('/getDelTime', function(req, res, next) {

var sql = 'select delivery.delivery_est_time as time from delivery where delivery.delivery_id =  ?'

 con.query(sql,[req.body.delivery_id], function (err, result) {
  if (err) throw err;
  if(result.length == 0 || result == undefined) {
    res.send(null) ;return 
  }
  res.send(result[0]["time"])
  
})
})
router.post('/getRefNotes', function(req, res, next) {
  
  var sql = 'select referrer.notes as notes \
   from referrer\
   join delivery on delivery.ref_id = referrer.person_id\
   where delivery.delivery_id = ?'
  
   con.query(sql,[req.body.delivery_id], function (err, result) {
    if (err) throw err;
    if(result.length == 0 || result == undefined) {
      res.send(null) ;return 
    }
    
    res.send(result[0]["notes"])
  })
  })

router.post('/getToContactDeliveries', function(req, res, next) {


  var sql = "SELECT delivery.delivery_id AS id, concat(person.person_fname, ' ', person.person_lname) AS name, concat(address.add_num , ' ' , address.add_street,', ', address.add_suburb) AS street, person.person_phone AS phone, (recipient.rec_children_under_5+ recipient.rec_children_between_5_10+ recipient.rec_children_between_11_17+ recipient.rec_adults) as meals, person.person_email AS email\
  FROM delivery\
  JOIN person on delivery.recipient_id = person.person_id\
  JOIN address on address.add_id = person.add_id\
  JOIN delivery_status on delivery.delivery_status = delivery_status.stat_id\
  JOIN recipient on recipient.person_id = person.person_id \
  WHERE delivery_status.stat_name like 'To Contact'\
  AND delivery.vol_id = ?\
  GROUP BY delivery.delivery_id\
  ORDER BY delivery.delivery_id\
   "
  
  
  
  con.query(sql,[req.body.user_id], function (err, result) {
      if (err) throw err;
      res.send(result)
    })
  })

  router.post('/getMealsForDelivery', function(req, res, next) {


// Gets all the freezer managers and their details
router.post('/getFreezerManagers', function(req, res, next) {
  //sql query for the data
  sql = "SELECT CONCAT(person.person_fname , ' ' , person.person_lname) as 'Name' ,CONCAT(address.add_num , ' ' , address.add_street) as 'Address', branch.branch_name as Branch, COUNT(meal.meal_id) as 'Available Meals'\
  FROM freezer\
  JOIN person ON freezer.person_id = person.person_id\
  JOIN address ON freezer.add_id = address.add_id\
  JOIN branch ON freezer.branch_id = branch.branch_id\
  JOIN meal ON freezer.freezer_id = meal.freezer_id\
  WHERE meal.delivery_id IS NULL\
  AND meal.freezer_id = freezer.freezer_id\
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


SELECT CONCAT(person.person_fname , ' ' , person.person_lname) as 'Name' ,CONCAT(address.add_num , ' ' , address.add_street) as 'Address', branch.branch_name as Branch, COUNT(meal.meal_id) as 'Available Meals' FROM freezer JOIN person ON freezer.person_id = person.person_id JOIN address ON freezer.add_id = address.add_id JOIN branch ON freezer.branch_id = branch.branch_id JOIN meal ON freezer.freezer_id = meal.freezer_id WHERE meal.delivery_id IS NULL AND meal.freezer_id = freezer.freezer_id




      var sql = ["start TRANSACTION;",
      "select delivery_status.stat_id into @a from delivery_status  where delivery_status.stat_name LIKE ?;",
      "UPDATE `delivery` SET `delivery_status` = @a\
      WHERE `delivery`.`delivery_id` = ?;",
      "COMMIT;"]
      var sqlVars = [
        [req.body.status],
       [ req.body.delivery_id]
      ]
      
      
      con.query(sql[0], function (err, result) {
        if (err) throw err;
        con.query(sql[1],sqlVars[0], function (err, result) {
          if (err) throw err;
          con.query(sql[2],sqlVars[1], function (err, result) {
            if (err) throw err;
            con.query(sql[3], function (err, result) {
              if (err) throw err;
              res.send(result)
            })
          })
        })
      })
        
    })

module.exports = router;