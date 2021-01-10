import jsonWebTokenUtil from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.SECRET_KEY;
const parseAuthorization = (authorization) => (authorization != null ? authorization.replace('Bearer ', '') : null);

const tokenGenerator = (userData) => {
  const token = jsonWebTokenUtil.sign(
    {
      id: userData[0],
      username: userData[1],
    },
    PRIVATE_KEY,
    {
      expiresIn: '24h',
    },
  );
  const expiration = Math.floor(parseInt(Date.now().toString(), 10) / 1000) + 86400;

  return { token, expiration };
};
const getUserId = (authorization) => {
  const token = parseAuthorization(authorization);
  const jwtToken = jsonWebTokenUtil.verify(token, PRIVATE_KEY);
  return jwtToken.id;
};

export default { tokenGenerator, getUserId, PRIVATE_KEY };
