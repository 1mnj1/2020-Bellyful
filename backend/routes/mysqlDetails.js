let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "belly_full" 
  }); 
  module.exports = {"con": con};


 

    // result = con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Got a result!\n",result);
    //     return result
    // });
