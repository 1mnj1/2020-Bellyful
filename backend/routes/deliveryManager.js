var express = require('express');
var router = express.Router();
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.post('/getPersonId', function(req, res, next) {
    sql = 'select person.person_id as id\
    from person\
    where person.person_fname = ? AND person.person_lname = ? AND person.person_email LIKE ?\
    OR person.person_phone like ? AND person.person_email LIKE ? AND person.person_fname LIKE ?\
    OR person.person_phone like ? AND person.person_email LIKE ? AND person.person_lname LIKE ?'
//     {name: "fname", value: "Math"}
// 1: {name: "lname", value: ""}
// 2: {name: "email", value: ""}
// 3: {name: "phone", value: ""}
    const personDetails = [
        req.body.fname,
        req.body.lname,
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
          console.log("Got a result!\n");
          console.log(result)
          if(result.length == 0){
            res.send("-1")
          } else {
            console.log(String(result[0].id))
            res.send(String(result[0].id))
          }
      });
});
router.post('/getAddress', function(req, res, next) {
    console.log(req.body)
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
          console.log("Got a result!\n");
          
          if(result.length == 0){
            res.send("-1")
          } else {
            console.log(String(result[0].add_id))
            res.send(String(result[0].add_id))
          }
      });
});







module.exports = router;