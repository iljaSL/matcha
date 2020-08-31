const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "rootpasswd",
  database: "matcha",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

app.get("/", (req, res) => {
  console.log("works");
});

app.listen(3000, () => {
  console.log("App is running!");
});
