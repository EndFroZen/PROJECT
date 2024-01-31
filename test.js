const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const mysql = require('mysql');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : "testmive",
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Use body-parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "test")));

// Serve HTML form on the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/test/index.html'));
});

app.post('/', (req, res) => {
  const storeID = req.body.storeID;
  const typeID = req.body.typeID;
  const productID = req.body.productID;
 
  console.log(`Received data: Store ID: ${storeID}, Type ID: ${typeID}, Menu ID: ${productID}`);

  // Insert data into MySQL database
  let sql = "INSERT INTO your_table_name (storeID, typeID, productID) VALUES (?, ?, ?)";
  db.query(sql, [storeID, typeID, productID], function (err, result) {
    if (err) throw err;
    console.log("Data inserted successfully!");
    res.send('Data received and inserted successfully!');
  });
});

app.get('/data', (req, res) => {
  let sql = "SELECT * FROM menu";
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Data retrieved successfully!");
    res.send(result);
  });
});

