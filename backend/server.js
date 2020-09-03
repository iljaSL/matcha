const app = require("express")();
const cors = require("cors");
var http = require("http").Server(app);
const mysql = require("mysql");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const userModel = require("./models/userModel");
const userRoute = require("./userRoute");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

http.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

app.use("/users/", userRoute.router);

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "rootpasswd",
//   database: "matcha",
//   connectionLimit: 5,
//   multipleStatements: true,
// });

// app.get("/", (req, res) => {
//   console.log("It works!");
// });

// app.post("/register", (req, res) => {
//   const users = {
//     lastname: req.body.lastname,
//     firstname: req.body.firstname,
//     username: req.body.username,
//     mail: req.body.mail,
//     password: req.body.password,
//   };

//   pool.query(
//     "INSERT INTO users(lastname, firstname, username, mail, password) VALUES (?, ?, ?, ?, ?)",
//     [
//       users.lastname,
//       users.firstname,
//       users.username,
//       users.mail,
//       users.password,
//     ],
//     function (err, res) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("query worked");
//       }
//     }
//   );
// });

// app.listen(3000, () => {
//   console.log("App is running!");
// });
