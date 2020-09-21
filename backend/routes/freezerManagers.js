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

router.post('/createMeals', function(req, res, next) {
  console.log('in volunteers sql query for create meals');
  // sql query works
  var sql = "call insertMeals(?,?,?,?)" // insert into meals (freezer_id, meal_type, num_meals)
  
  
  if(req.body.person_id=="-1"){
    console.log("selecting freezer with person_id: '",typeof(req.body.person_id),"'")
    const sqlVars = [
      null,
      req.body.mealType,
      req.body.numItems,
      req.body.delivery_id
    ] 
    con.query(sql,sqlVars, function (err, result) {
      if (err) throw err;
      console.log("Inserted ",req.body.numItems, " meals.");
      
      res.sendStatus(200)
    });
    return
  }
  var personQuery = "select freezer.freezer_id as ID from freezer where freezer.person_id = ?"
  con.query(personQuery, [req.body.person_id], (err,result)=>{
    if (err) throw err;
    if ((result == undefined || result == null)) {return} ;
    if (result.length == 0) {return }
    
    const sqlVars = [
      result[0].ID,
      req.body.mealType,
      req.body.numItems,
      null
    ] 
    con.query(sql,sqlVars, function (err, result) {
      if (err) throw err;
      console.log("Inserted ",req.body.numItems, " meals.");
      
      res.sendStatus(200)
    });
  })



  

});


router.post('/removeMeals', function(req, res, next) {
  // sql query works
  var sql = "call deleteMeals(?,?,?,?)" // insert into meals (freezer_id, meal_type, num_meals)
  if(req.body.person_id=="-1"){
    const sqlVars = [
      null,
      req.body.mealType,
      req.body.numItems,
      req.body.delivery_id
    ] 
    con.query(sql,sqlVars, function (err, result) {
      if (err) throw err;
      console.log("Deleted ",req.body.numItems, " meals.");
      
      res.sendStatus(200)
    });
    return
  }
  var personQuery = "select freezer.freezer_id as ID from freezer where freezer.person_id = ?"
  console.log("selecting freezer with person_id: ",req.body.person_id)
  con.query(personQuery, [req.body.person_id], (err,result)=>{
    if (err) throw err;
    if ((result == undefined || result == null)) {return} ;
    if (result.length == 0) {return }
    
    const sqlVars = [
      result[0].ID,
      req.body.mealType,
      req.body.numItems,
      null
    ] 
    con.query(sql,sqlVars, function (err, result) {
      if (err) throw err;
      console.log("Inserted ",req.body.numItems, " meals.");
      
      res.sendStatus(200)
    });
  })

});


module.exports = router;
