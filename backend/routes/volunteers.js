var express = require('express');
var router = express.Router();
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.post('/getBranch', function(req, res, next) {
  sql = 'select branch.branch_id as id\
  from branch\
  join volunteer on volunteer.branch_id = branch.branch_id\
  where volunteer.person_id = ? \
   '

  con.query(sql, [req.body.vol_id], function (err, result) {
        if (err) throw err;
        if(result.length == 0){
          res.sendStatus(404)
        } else {
          res.send(String(result[0].id))
        }
    });
});

router.post('/getNewDeliveries', function(req, res, next) {



var sql =  "SELECT delivery.delivery_id AS id, concat(person.person_fname, ' ', person.person_lname) AS name, concat(address.add_num , ' ' , address.add_street,', ', address.add_suburb) AS street, person.person_phone AS phone, (recipient.rec_children_under_5+ recipient.rec_children_between_5_10+ recipient.rec_children_between_11_17+ recipient.rec_adults) as meals, person.person_email AS email\
  FROM delivery\
  JOIN person on delivery.recipient_id = person.person_id\
  JOIN address on address.add_id = person.add_id\
  JOIN delivery_status on delivery.delivery_status = delivery_status.stat_id\
  JOIN recipient on recipient.person_id = person.person_id \
  join branch on branch.branch_id = delivery.branch_id\
  WHERE delivery_status.stat_name like \"Unassigned\"\
  AND branch.branch_id = ?\
  GROUP BY delivery.delivery_id\
  ORDER BY delivery.delivery_id\
   "

  
con.query(sql,[req.body.branch_id], function (err, result) {
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
  router.post('/getAssignedIntransit', function(req, res, next) {


    var sql = "SELECT delivery.delivery_id AS id, concat(person.person_fname, ' ', person.person_lname) AS name, concat(address.add_num , ' ' , address.add_street,', ', address.add_suburb) AS street, person.person_phone AS phone, (recipient.rec_children_under_5+ recipient.rec_children_between_5_10+ recipient.rec_children_between_11_17+ recipient.rec_adults) as meals, person.person_email AS email\
    FROM delivery\
    JOIN person on delivery.recipient_id = person.person_id\
    JOIN address on address.add_id = person.add_id\
    JOIN delivery_status on delivery.delivery_status = delivery_status.stat_id\
    JOIN recipient on recipient.person_id = person.person_id \
    WHERE (delivery_status.stat_name like 'Assigned' OR delivery_status.stat_name like 'In Transit')\
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

    router.post('/getMapAddresses', function(req, res, next) {
      //needs to return:
      // [{address:"21 springwater vale unsworth heights auckland", type: "Start"},
      //           {address:"1 springwater vale unsworth heights auckland", type: "Freezer"},
      //           {address:"Massey University, Dairy Flat, Albany, Auckland", type:"Recipient"}]

      var sql = "select DISTINCT mealAddress.address as address, 'Freezer' as type\
      from \
      (\
      select CONCAT(address.add_num, ' ' , address.add_street, ' ', address.add_suburb, ' ', address.add_city, ' ', address.add_postcode) as address\
      from delivery \
      join meal on meal.delivery_id = delivery.delivery_id\
      join freezer on freezer.freezer_id = meal.freezer_id\
      join address on address.add_id = freezer.add_id\
      where delivery.delivery_id = ?\
      \
      ) as mealAddress"
      var sqlVars = [req.body.delivery_id]
      
      console.log("SqlVars: ", sqlVars)
      con.query(sql, sqlVars, function (err, freezer) {
        if (err) throw err;
        if(freezer.length == 0) {
          console.log("There are no freezer meals for this delivery!")
          
          res.sendStatus(404)
          return
        }
        sql = "select \
        CONCAT(volAdd.add_num, ' ' , volAdd.add_street, ' ', volAdd.add_suburb, ' ', volAdd.add_city, ' ', volAdd.add_postcode) as volAddress,\
        CONCAT(recAdd.add_num, ' ' , recAdd.add_street, ' ', recAdd.add_suburb, ' ', recAdd.add_city, ' ', recAdd.add_postcode) as recAddress\
        from delivery \
        join person as rec on rec.person_id = delivery.recipient_id \
        join person as vol on vol.person_id = delivery.vol_id \
        join address as volAdd on vol.add_id = volAdd.add_id\
        join address as recAdd on rec.add_id = recAdd.add_id\
        where delivery.delivery_id = ?"
        con.query(sql, sqlVars, function (err, startStop) {
          if (err) throw err;
          if(startStop.length == 0) {
            console.log("There are no freezer meals for this delivery!")
            res.send(404)
            return
          }
          var start = startStop[0].volAddress
          var stop = startStop[0].recAddress
          freezer.splice(0, 0, {address: start, type: "start"});
          freezer.push({address: stop, type: "start"})
          res.send(freezer)
          
        })
      })
    })
    router.post('/getStartStop', function(req, res, next) {
  
      var sql = 'select delivery.delivery_est_time as estTime, delivery.delivery_start as  start, delivery.delivery_end as  end \
      from delivery\
      where delivery.delivery_id = ?'
      
       con.query(sql,[req.body.delivery_id], function (err, result) {
        if (err) throw err;
        if(result.length == 0 || result == undefined) {
          res.send(null) ;return 
        }
        
        res.send(result)
      })
    })
    router.post('/setStart', function(req, res, next) {
  
      var sql = "UPDATE `delivery` SET `delivery_status` = '3', `delivery_start` = CURRENT_TIMESTAMP() WHERE `delivery`.`delivery_id` = ?"
      
       con.query(sql,[req.body.delivery_id], function (err, result) {
        if (err) throw err;
        if(result.length == 0 || result == undefined) {
          res.send(null) ;return 
        }
        
        res.send(result)
      })
    })

    router.post('/setStop', function(req, res, next) {
  
      var sql = 'UPDATE delivery \
      SET delivery.delivery_end = CURRENT_TIMESTAMP()\
      where delivery.delivery_id = ?'
      
       con.query(sql,[req.body.delivery_id], function (err, result) {
        if (err) throw err;
        if(result.length == 0 || result == undefined) {
          res.send(null) ;return 
        }
        
        res.send(result)
      })
    })

    router.post('/setToContact', function(req, res, next) {
      
      var sql = "UPDATE `delivery` SET `vol_id` = ?,\
      `delivery_status` = '7' \
      WHERE `delivery`.`delivery_id` = ? "

      
      
      var reqVals = req.body.delivery_ids.trim().split(",")
      var sqlQuery = [req.body.vol_id, reqVals[0]]
      console.log("Initial data: ",reqVals )
      for (var i = 1; i < reqVals.length; ++i){
        sqlQuery.push(reqVals[i])
        sql = sql + " OR `delivery`.`delivery_id` = ? "
      }
      console.log("Query data: ",sqlQuery)
      
      
       con.query(sql,sqlQuery, function (err, result) {
        if (err) throw err;
        res.send("complete")
      })
    })
module.exports = router;