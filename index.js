const express = require('express')
const app = express()
const path = require('path')
app.set('view engine','ejs')
const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database : "test"
// });
  
// db.connect(function(err) {
//     if (err) {
//         console.error("Error connecting to MySQL:", err);
//         throw err;
//     }
//     console.log("Connected!");
// });
  

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})

app.get('/',(req,res)=>{
    res.render('../Webtest_html/page1')
})

app.get('/page2', (req, res) => {
    let sql = "SELECT * FROM konsod";
    db.query(sql, function (err, result) {
      if (err) {
        console.error("Error retrieving data from MySQL:", err);
        return res.status(500).send("Internal Server Error");
      }
  
      res.render('page2', { data: result });
    });
  });
