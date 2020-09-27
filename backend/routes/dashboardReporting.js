var express = require('express');
var router = express.Router();
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con


router.post('/getManagerStockLevels', function(req, res, next) {
    //sql query for the data
    var sql = ""
    var sqlvars = null
      sql = "select person.person_id as id, concat(person.person_fname, ' ', person.person_lname) as name,\
       meal_type.meal_type as mealType , COUNT(meals.meal_id)  as 'cnt'\
      from freezer\
      join person on person.person_id = freezer.person_id\
      join meal_type \
      left outer join meal as meals on  meal_type.MT_id = meals.meal_type and meals.freezer_id = freezer.freezer_id\
      group by freezer.freezer_id, meal_type.meal_type"
    
    //returns meal type id, meal type name, and available meals
  // res.send("Got here!")
    con.query(sql,sqlvars, function (err, result) {
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





module.exports = router;