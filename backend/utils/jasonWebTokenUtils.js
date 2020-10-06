import jsonWebTokenUtil from 'jsonwebtoken';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const rootDir = dirname(fileURLToPath(import.meta.url));

const PRIVATE_KEY = fs.readFileSync(`${rootDir}/keys/private.key`);

export default {
  tokenGenerator: (userData) => {
    console.log(userData);
    const jwtToken = jsonWebTokenUtil.sign(
      {
        id: userData[0],
        username: userData[1],
      },
      PRIVATE_KEY,
      {
        expiresIn: '24h',
      },
    );
    console.log(jwtToken);
    return jwtToken;
  },
};
