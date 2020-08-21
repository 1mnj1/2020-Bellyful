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


  var sql = "SELECT delivery.delivery_id AS id, concat(person.person_fname, ' ', person.person_lname) AS name, concat(address.add_num , ' ' , address.add_street,', ', address.add_suburb) AS street, person.person_phone AS phone, COUNT(meal.meal_id) AS meals, person.person_email AS email\
  FROM delivery\
  JOIN person on delivery.recipient_id = person.person_id\
  JOIN address on address.add_id = person.add_id\
  JOIN delivery_status on delivery.delivery_status = delivery_status.stat_id\
  JOIN meal on meal.delivery_id = delivery.delivery_id\
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
    router.post('/updateDelDeets', function(req, res, next) {
      var datetime = (req.body.DelTime.replace("T", " "))+":00"
      var data = [
        req.body.refNotes,
        req.body.delivery_id,
        
      ]
      var data2 = [
        datetime,
        req.body.delivery_id
      ]
      var sql = "UPDATE `referrer` SET `notes` = ? \
      WHERE `referrer`.`person_id` = (select delivery.ref_id from delivery where delivery.delivery_id = ?)"
      var sql2 = " UPDATE `delivery` SET `delivery_est_time` = ? WHERE `delivery`.`delivery_id` = ? "
      
      
      
      con.query(sql,data, function (err, result) {
          if (err) throw err;
        })
      con.query(sql2,data2, function (err, result) {
        if (err) throw err;
      })
    })
    router.post('/updateDelState', function(req, res, next) {


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