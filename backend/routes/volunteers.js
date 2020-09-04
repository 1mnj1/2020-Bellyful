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

router.post('/updateDelDeets', function(req, res, next) {
  console.log(req.body)

  
  var delTime = (req.body.DelTime.replace("T", " "))+":00"
  // 2020-09-18T21:19
  // 2020-09-16 21:19:00
  console.log(delTime)

  var sql = "select referrer.person_id as id \
  from referrer \
  join delivery on delivery.ref_id = referrer.person_id \
  where delivery.delivery_id = ? "

  con.query(sql, [req.body.delivery_id], function (err, result) {
        if (err) throw err;
        if(result.length == 0){
          res.sendStatus(404)
        } 
        sql = "UPDATE `referrer` SET `notes` = ? WHERE `referrer`.`person_id` = ?"
        con.query(sql, [req.body.refNotes,result[0].id], function (err, result) {
          if (err) throw err;
          if(result.length == 0){
            res.sendStatus(404)
        } });

    });
    sql = "UPDATE `delivery` SET `delivery_est_time` = ? WHERE `delivery`.`delivery_id` = ?"
    con.query(sql, [delTime, req.body.delivery_id], function (err, result) {
      if (err) throw err;
      if(result.length == 0){
        res.sendStatus(404)
      } 
      

    });



  res.sendStatus(200)
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

router.post('/getMealsForDelivery', function(req, res, next) {
  var sql = 'select meal_type.meal_type as "Meal" , COUNT(M.meal_id) as "Count"\
  from meal_type\
  left outer join (select * from meal where meal.delivery_id = ?) as M on meal_type.MT_id = M.meal_type\
  \
  group by meal_type.MT_id\
  '
  
   con.query(sql,[req.body.delivery_id], function (err, result) {
    if (err) throw err;
    if(result.length == 0 || result == undefined) {
      res.send(null) ;return 
    }
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
// Gets the number of avaiable meals for all freezers and branches
router.post('/getFreezerLog', function(req, res, next) {
  //sql query for the data
  sql = "\
  SELECT \
    MT.MT_id AS 'Meal Type Id', \
    MT.meal_type AS Dish,\
     COUNT(M.meal_type) as \"cnt\"\
  FROM meal_type AS MT \
   left outer JOIN \
     (\
         select Mm.meal_type from	`meal` AS Mm\
         JOIN freezer on  freezer.freezer_id = Mm.freezer_id\
         WHERE freezer.person_id = ?\
    AND Mm.delivery_id is null) as M ON M.meal_type = MT.MT_id\
   \
   GROUP by MT.MT_id"
  //returns meal type id, meal type name, and available meals
  // res.send("Got here!")
  con.query(sql,[req.body.person_id], function (err, result) {
        if (err) throw err;
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.sendStatus(404)
        } else {
          res.send(result)
        }
    });
  
});



// Gets all the freezer managers and their details
router.post('/getFreezerManagers', function(req, res, next) {
  //sql query for the data
  sql = "\
    SELECT\
      CONCAT(person.person_fname , ' ' , person.person_lname) as 'Name',\
      CONCAT(address.add_num , ' ' , address.add_street) as 'Steet',\
      address.add_suburb AS 'Suburb', \
      branch.branch_name as Branch, \
      person.person_phone AS 'Phone',\
      COUNT(meal.meal_id) as 'Available Meals',\
      freezer.person_id AS 'Person Id'\
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


// Gets all the freezer managers and their details
router.post('/getFreezerManagers2', function(req, res, next) {
  //sql query for the data
  sql = "\
  SELECT\
  CONCAT(person.person_fname , ' ' , person.person_lname) as 'Name',\
  CONCAT(address.add_num , ' ' , address.add_street) as 'Steet',\
  address.add_suburb AS 'Suburb',\
  branch.branch_name AS 'Branch',\
  person.person_phone AS 'Phone',\
  freezer.person_id AS 'Person Id'\
    FROM freezer\
      JOIN person ON freezer.person_id = person.person_id\
      JOIN address ON freezer.add_id = address.add_id\
      JOIN branch ON freezer.branch_id = branch.branch_id\
      WHERE freezer.branch_id = ?\
  "
  //returns id, name, address, branch name
  // res.send("Got here!")
  con.query(sql, [req.body.branch_id], function (err, result) {
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






router.post('/updateDelState', function(req, res, next) {
var sql = ["start TRANSACTION;",
"select delivery_status.stat_id into @a from delivery_status  where delivery_status.stat_name LIKE ?;",
"UPDATE `delivery` SET `delivery_status` = @a \
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



// Gets all the freezer managers and their details
router.post('/assignDeliveryMeals', function(req, res, next) {
  console.log("in assignDeliveryMeals sql")
  //sql query for the data
  sql = "\
    UPDATE meals\
    SET meals.delivery_id = ?\
    WHERE meal_type = ?\
    LIMIT ?"
  //returns id, name, address, branch name
  // res.send("Got here!")
  con.query(sql, [req.body.delivery_id, req.body.mealType, req.body.numItems], function (err, result) {
    console.log([req.body.delivery_id, req.body.mealType, req.body.numItems]);
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

// Gets all the freezer managers and their details
router.post('/removeDeliveryMeals', function(req, res, next) {
  console.log("in removeDeliveryMeals sql")
  //sql query for the data
  sql = "\
    UPDATE meals\
    SET meals.delivery_id = null\
    WHERE meal_type = ?\
    LIMIT ?"
  //returns id, name, address, branch name
  // res.send("Got here!")
  con.query(sql, [req.body.mealType, req.body.numItems], function (err, result) {
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