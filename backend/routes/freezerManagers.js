var express = require('express');
var router = express.Router();
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/getItemWithBranch', function(req, res, next) {
    sql = "SELECT meal_type.meal_type as \"Meal\", COUNT(meal.meal_id) as 'Meal Count', freezer.freezer_id as 'Freezer', branch.branch_name\
    from meal_type, meal, freezer, branch\
    where meal_type.MT_id = meal.meal_type\
    AND freezer.branch_id = branch.branch_id\
    GROUP BY (meal_type.MT_id)"
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
router.post('/getMealTypes', function(req, res, next) {
    sql = "SELECT meal_type.meal_type as \"Meal\" from meal_type"
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


module.exports = router;
