import jsonWebTokenUtil from "jsonwebtoken";
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PRIVATE_KEY = fs.readFileSync(__dirname + "/keys/private.key");

export default {
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
