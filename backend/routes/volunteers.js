var express = require('express');
var router = express.Router();
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.post('/getNewDeliveries', function(req, res, next) {



var sql = "SELECT delivery.delivery_id AS id, concat(person.person_fname, ' ', person.person_lname) AS name, concat(address.add_num , ' ' , address.add_street,', ', address.add_suburb) AS street, person.person_phone AS phone, COUNT(meal.meal_id) AS meals\
 FROM delivery\
 JOIN person on delivery.recipient_id = person.person_id\
 JOIN address on address.add_id = person.add_id\
 JOIN delivery_status on delivery.delivery_status = delivery_status.stat_id\
 JOIN meal on meal.delivery_id = delivery.delivery_id\
 WHERE delivery_status.stat_name like \"Unassigned\"\
 GROUP BY delivery.delivery_id\
 "



con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
  })
})

router.post('/getToContactDeliveries', function(req, res, next) {


  var sql = "SELECT delivery.delivery_id AS id, concat(person.person_fname, ' ', person.person_lname) AS name, concat(address.add_num , ' ' , address.add_street,', ', address.add_suburb) AS street, person.person_phone AS phone, COUNT(meal.meal_id) AS meals\
  FROM delivery\
  JOIN person on delivery.recipient_id = person.person_id\
  JOIN address on address.add_id = person.add_id\
  JOIN delivery_status on delivery.delivery_status = delivery_status.stat_id\
  JOIN meal on meal.delivery_id = delivery.delivery_id\
  WHERE delivery_status.stat_name like 'To Contact'\
  AND delivery.vol_id = ?\
  GROUP BY delivery.delivery_id\
   "
  
  
  
  con.query(sql,[req.body.user_id], function (err, result) {
      if (err) throw err;
      res.send(result)
    })
  })

  router.post('/getMealsForDelivery', function(req, res, next) {


    var sql = "select meal_type.meal_type as meal, COUNT(meal.meal_id) as amnt\
    from meal \
    join meal_type on meal.meal_type = meal_type.MT_id\
    WHERE meal.delivery_id = ?\
    group by meal_type.MT_id\
     "
    
    
    
    con.query(sql,[req.body.delivery_id], function (err, result) {
        if (err) throw err;
        res.send(result)
      })
    })



module.exports = router;