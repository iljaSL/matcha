import jsonWebTokenUtil from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const PRIVATE_KEY = process.env.SECRET_KEY;
const parseAuthorization = (authorization) => (authorization != null ? authorization.replace('Bearer ', '') : null);

const tokenGenerator = (userData) => jsonWebTokenUtil.sign(
  {
    id: userData[0],
    username: userData[1],
  },
  PRIVATE_KEY,
  {
    expiresIn: '24h',
  },
);

const getUserId = (authorization) => {
  let userId = 0;
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
