const jsonWebTokenUtil = require("jsonwebtoken");
const fs = require("fs");

const PRIVATE_KEY = fs.readFileSync(__dirname + "/keys/private.key");
module.exports = {
  tokenGenarator: (userData) => {
    console.log(userData);
    const jwt_token = jsonWebTokenUtil.sign(
      {
        id: userData[0],
        username: userData[1],
      },
      PRIVATE_KEY,
      {
        expiresIn: "24h",
      }
    );
    console.log(jwt_token);
    return jwt_token;
  },
};
