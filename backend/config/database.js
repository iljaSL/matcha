const mysql = require("mysql");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "rootpasswd",
  database: "",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});
