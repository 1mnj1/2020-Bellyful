var express = require('express');
var router = express.Router();
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.post('/getNewDeliveries', function(req, res, next) {



var sql = "Select delivery.delivery_id as id, concat(person.person_fname, ' ', person.person_lname) as name, concat(address.add_num , ' ' , address.add_street,', ', address.add_suburb) as street, person.person_phone as phone, COUNT(meal.meal_id) as meals\
 from delivery\
 join person on delivery.recipient_id = person.person_id\
 join address on address.add_id = person.add_id\
 join delivery_status on delivery.delivery_status = delivery_status.stat_id\
 join meal on meal.delivery_id = delivery.delivery_id\
 where delivery_status.stat_name like \"Unassigned\"\
 group by delivery.delivery_id\
 "



con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
  })
})




module.exports = router;