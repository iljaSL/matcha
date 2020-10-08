import jsonWebTokenUtil from 'jsonwebtoken';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const PRIVATE_KEY = fs.readFileSync(`${rootDir}/keys/private.key`);

const tokenGenerator = (userData) => {
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
};

const parseAuthorization = (authorization) => (authorization != null ? authorization.replace('Bearer ', '') : null);

const getUserId = (authorization) => {
  let userId = -1;
  const token = parseAuthorization(authorization);
  if (token != null) {
    try {
      const jwtToken = jsonWebTokenUtil.verify(token, PRIVATE_KEY);
      if (jwtToken != null) userId = jwtToken.id;
    } catch (err) {
      console.log(err);
    }
  }
  return userId;
};

export default { tokenGenerator, getUserId, PRIVATE_KEY };
