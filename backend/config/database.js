const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "rootpasswd",
  database: "matcha"
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DB connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DB has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DB connection was refused.");
    }
  } else {
    console.log("DB is connected!");
  }
  if (connection) connection.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
