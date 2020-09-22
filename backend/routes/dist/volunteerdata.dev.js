"use strict";

var express = require('express');

var router = express.Router();
/* GET users listing. */

mysql = require('mysql');
mysqlDetails = require('./mysqlDetails');
con = mysqlDetails.con;
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/', function (req, res, next) {
  //sql query for the data
  sql = "SELECT person.person_fname, person.person_lname, \
        person.person_phone as phone, person.person_email as email, address.add_suburb as suburb\
        FROM person, address\
        WHERE person.add_id = address.add_id";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Got a Result\n");
    console.log(result);

    if (result.length == 0) {
      res.send("0");
    } else {
      var data = $(result).serializeArray();
      res.send(String(data));
    }
  }); // res.send("Correct!")
});
module.exports = router;