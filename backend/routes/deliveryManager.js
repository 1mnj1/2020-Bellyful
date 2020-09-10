var express = require('express');
var router = express.Router();
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.post('/getPersonId', function(req, res, next) {
    sql = 'select person.person_id as id\
    from person\
    WHERE person.person_email LIKE ?\
    OR person.person_phone like ? AND person.person_email LIKE ? AND person.person_fname LIKE ?\
    OR person.person_phone like ? AND person.person_email LIKE ? AND person.person_lname LIKE ?'
//     {name: "fname", value: "Math"}
// 1: {name: "lname", value: ""}
// 2: {name: "email", value: ""}
// 3: {name: "phone", value: ""}
    const personDetails = [
        req.body.email,
        req.body.phone,
        req.body.email,
        req.body.fname,
        req.body.phone,
        req.body.email,
        req.body.lname
    ]

    // res.send("Got here!")
    con.query(sql,personDetails, function (err, result) {
          if (err) throw err;
          if(result.length == 0){
            res.send("-1")
          } else {
            console.log(String(result[0].id))
            res.send(String(result[0].id))
          }
      });
});
router.post('/getAddress', function(req, res, next) {
    const addressDetails = [
        req.body.streetNum,
        req.body.streetName,
        req.body.suburb,
        req.body.city,
        req.body.postcode
      ]
    sql = 'select address.add_id from address\
    where address.add_num like ?\
    AND address.add_street like ?\
    AND address.add_suburb like ?\
    AND address.add_city like ?\
    AND address.add_postcode like ?\
    '
    
    // res.send("Got here!")
    con.query(sql, addressDetails,function (err, result) {
          if (err) throw err;
          
          if(result.length == 0){
            res.send("-1")
          } else {
            res.send(String(result[0].add_id))
          }
      });
});
function findAddress(req,success){
  var address_ID = req.body.address_id
  
  if(req.body.address_id == -1){
    
    sql = "INSERT INTO `address` (`add_id`, `add_num`, `add_street`, `add_suburb`, `add_city`, `add_postcode`) VALUES (NULL, ?, ?, ?, ?, ?)"

    //     {name: "fname", value: "Math"}
    // 1: {name: "lname", value: ""}
    // 2: {name: "email", value: ""}
    // 3: {name: "phone", value: ""}
    const addressDetails = [
        req.body.streetNum,
        req.body.streetName,
        req.body.suburb,
        req.body.city,
        req.body.postcode

    ]

    // res.send("Got here!")
    con.query(sql,addressDetails, function (err, result) {
          if (err) throw err;
          console.log("Created address")
          
      });
    sql = 'select address.add_id from address\
    where address.add_num like ?\
    AND address.add_street like ?\
    AND address.add_suburb like ?\
    AND address.add_city like ?\
    AND address.add_postcode like ?\
    '
     con.query(sql, addressDetails,function (err, result) {
      if (err) throw err;
      address_ID = String(result[0].add_id)
      success(address_ID)
      
    });
  } else {
    success(address_ID)
  }
}
function findPerson(req,add_id, success){
  var person_ID = req.body.person_id 
  if(req.body.person_id == -1){
    sql = "INSERT INTO `person` (`person_id`, `person_phone`, `person_email`, `person_fname`, `person_lname`, `person_pass`, `person_user_level`, `add_id`) VALUES (NULL, ?, ?, ?, ?, 'P@ssword', '0', ?)"

    //     {name: "fname", value: "Math"}
    // 1: {name: "lname", value: ""}
    // 2: {name: "email", value: ""}
    // 3: {name: "phone", value: ""}
    const addressDetails = [
        req.body.phone,
        req.body.email,
        req.body.fname,
        req.body.lname,
        add_id

    ]

    // res.send("Got here!")
    con.query(sql,addressDetails, function (err, result) {
          if (err) throw err;
          console.log("Created a person!\n");
          
      });
      sql = 'select person.person_id as id\
      from person\
      where  person.person_phone like ?  AND person.person_email LIKE ? AND person.person_fname = ? AND person.person_lname = ?'
     con.query(sql, addressDetails,function (err, result) {
      if (err) throw err;
      
      person_ID = String(result[0].id)
      success(person_ID)
      
    });
  } else {
    sql = "UPDATE `person` SET `person_phone` = ?, `person_email` = ?, `person_fname` = ?,\
     `person_lname` = ? ,  `add_id` = ? WHERE `person`.`person_id` = ?"
    //     {name: "fname", value: "Math"}
    // 1: {name: "lname", value: ""}
    // 2: {name: "email", value: ""}
    // 3: {name: "phone", value: ""}
    const addressDetails = [
        req.body.phone,
        req.body.email,
        req.body.fname,
        req.body.lname,
        add_id,
        person_ID


    ]

    // res.send("Got here!")
    con.query(sql,addressDetails, function (err, result) {
          if (err) throw err;
          console.log("Updated Person!\n");
          
      });
      success(person_ID)
  }
  
}
router.post('/submitRecipient', function(req, res, next) {
  try{
    findAddress(req, (add_id)=>{
      findPerson(req,add_id,(person_id)=>{
        sql = 'SELECT  recipient.person_id from recipient where recipient.person_id = ?'
        con.query(sql,[person_id], function (err, result) {
          if (err) throw err;
          console.log("Checking if recipient exists!\n");
          var sql = ""
          var referrerDetails = ""
          if(result.length > 0){
            //if the recipient exists, update them.
            sql = "UPDATE `recipient` SET  `rec_dogs` = ?, `rec_children_under_5` = ?, `rec_children_between_5_10` = ?,\
            `rec_children_between_11_17` = ?, `rec_adults` = ?, `rec_dietary_req` = ?, `rec_allergies` = ? \
            WHERE `recipient`.`person_id` = ?"
            referrerDetails = [
              req.body.dogs,
              req.body.child_under_5,
              req.body.child_between_5_10,
              req.body.child_between_11_17,
              req.body.adults,
              req.body.dietaryReq,
              req.body.allergyNotes,
              person_id
            ]
          } else {
            //if the recipient doesnt exist insert
            sql = "INSERT INTO `recipient` (`person_id`, `rec_dogs`, `rec_children_under_5`, `rec_children_between_5_10`,\
            `rec_children_between_11_17`, `rec_adults`, `rec_dietary_req`, `rec_allergies`)\
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            referrerDetails = [
              person_id,
              req.body.dogs,
              req.body.child_under_5,
              req.body.child_between_5_10,
              req.body.child_between_11_17,
              req.body.adults,
              req.body.dietaryReq,
              req.body.allergyNotes,
            ]
          }
            
          // res.send("Got here!")
          con.query(sql,referrerDetails, function (err, result) {
                if (err) throw err;
                console.log("Created a recipient!\n");
                
            });
            sql = 'SELECT  recipient.person_id from recipient where recipient.person_id = ?'
            con.query(sql,[person_id], function (err, result) {
              if (err) throw err;
              res.send(String(result[0].person_id))
            })
            

                  
          });
      })
    })
  } catch (error) {
    console.log("Found error: ",error)
  }
});

router.post('/submitReferrer', function(req, res, next) {
  try {
    
  
    findAddress(req, (add_id)=>{
      findPerson(req,add_id,(person_id)=>{
        sql = 'SELECT  referrer.person_id from referrer where referrer.person_id = ?'
        con.query(sql,[person_id], function (err, result) {
          if (err) throw err;
          console.log("Checking if Referrer exists!\n");
          var sql = ""
          var referrerDetails = ""
          if(result.length > 0){
            //if the recipient exists, update them.
            sql = "UPDATE `referrer` SET `RT_type` = ?, \
            `notes` = ?, `organisation` = ?\
            WHERE `referrer`.`person_id` = 1"
            referrerDetails = [
              req.body.RefType,
              req.body.refNotes,
              req.body.refOrg,
              person_id
            ]
          } else {
            //if the recipient doesnt exist insert
            sql = "INSERT INTO `referrer` (`person_id`, `RT_type`, `notes`, `organisation`) VALUES (?, ?, ?, ?)"
            referrerDetails = [
              person_id,
              req.body.RefType,
              req.body.refNotes,
              req.body.refOrg
            ]
          }
            
          // res.send("Got here!")
          con.query(sql,referrerDetails, function (err, result) {
                if (err) throw err;
                console.log("Created a referrer!\n");
                
            });
            sql = 'SELECT  referrer.person_id as id from referrer where referrer.person_id = ?'
            con.query(sql,[person_id], function (err, result) {
              if (err) throw err;
              res.send(String(result[0].id))
            })
            

                  
          });
      })
    })
  } catch (error) {
      console.log(error)
  }
});

router.post('/submitICE', function(req, res, next) {
  try{
    findAddress(req, (add_id)=>{
      findPerson(req,add_id,(person_id)=>{
        res.send(person_id)
      })
    })
  } catch (error) {
    console.log("Found error: ",error)
  }
});
router.post('/submitVolunteer', function(req, res, next) {
  
  console.log("Vol data: ", req.body)
  findAddress(req, (add_id)=>{
    findPerson(req,add_id,(person_id)=>{
      const sql = "SELECT volunteer.person_id as id from volunteer WHERE volunteer.person_id  = ? "
      con.query(sql,[person_id], function (err, result) {
        var sql = ""
          var volDetails = ""
          //if there is a volunteer, update them
          if(result.length > 0){
            //if the recipient exists, update them.
            sql = "UPDATE `volunteer` \
            SET `ice_id` = ?, \
            `branch_id` = ?, \
            `vol_status` = ?\
            WHERE `volunteer`.`person_id` = ?"
            volDetails = [
              req.body.ice_id,
              req.body.B_Val,
              req.body.Status,
              person_id
            ]
          } else {
            //if the recipient doesnt exist insert
            sql = "INSERT INTO `volunteer` (`person_id`, `ice_id`, `branch_id`, `vol_status`) VALUES (?,?,?,?)"
            volDetails = [
              person_id,
              req.body.ice_id,
              req.body.B_Val,
              req.body.Status
            ]
          }
            
          // res.send("Got here!")
          con.query(sql,volDetails, function (err, result) {
                if (err) throw err;
                console.log("Created a referrer!\n");
                res.send(person_id)
            });
            
            

                  
          
      })





    })
  })

})

router.post('/submitFreezer', function(req, res, next) {
  try {
    
  
    findAddress(req, (add_id)=>{     
          sqlVars = [
            req.body.freezerManager,
            add_id,
            req.body.branch
            
          ]
          // res.send("Got here!")
          
            sql = 'INSERT INTO `freezer` (`freezer_id`, `person_id`, `add_id`, `branch_id`) VALUES (NULL, ?,?,?)'
            con.query(sql,sqlVars, function (err, result) {
              if (err) console.log(err)
              res.sendStatus(200)
            })
            

                  
          });
  } catch (error) {
      console.log(error)
  }
});
router.post('/getBranch', function(req, res, next) {
  sql = 'select branch.branch_id as id, branch.branch_name as branch from branch'

  con.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length == 0){
          res.send([])
        } else {
          res.send(result)
        }
    });
});

router.post('/getStatuses', function(req, res, next) {
  sql = 'SELECT vol_status.VS_id as id, vol_status.VS_stat as status from vol_status'

  con.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length == 0){
          res.send([])
        } else {
          res.send(result)
        }
    });
});

router.post('/submitDelivery', function(req, res, next) {
  var sql = ""
  console.log("Rquest: ",req.body)
  if(req.body.ref !== ''){
    sql = "INSERT INTO `delivery` (`delivery_id`, `vol_id`, `ref_id`, `recipient_id`, `delivery_status`, \
    `delivery_start`, `delivery_end`, `branch_id`)\
    VALUES (NULL, NULL, ?, ?, '1', NULL, NULL, ?)"
    sqlData = [
      req.body.ref,
      req.body.rec,
      req.body.branch
    ]
  } else {
    sql = "INSERT INTO `delivery` (`delivery_id`, `vol_id`, `ref_id`, `recipient_id`, `delivery_status`, \
     `delivery_start`, `delivery_end`, `branch_id`)\
    VALUES (NULL, NULL, NULL, ?, '1', NULL, NULL, ?)"
    sqlData = [
      req.body.rec,
      req.body.branch
    ]
  }
  con.query(sql, sqlData, function (err, result) {
        if (err) throw err;
        if(result.length == 0){
          res.send([])
        } else {
          res.send(result)
        }
    });
});


module.exports = router;