const newValidUser = {
  lastname: 'Lustig',
  firstname: 'Peter',
  username: 'plustig',
  mail: 'peter@mail.com',
  password: 'Peter123',
};

const newUserMissingUsername = {
  lastname: 'Lustig',
  firstname: 'Birgit',
  mail: 'birgit@mail.com',
  password: 'Peter123',
};

const invalidUsers = [
  newUserMissingUsername,
  {
    firstname: 'Angela',
    username: 'amerkel',
    mail: 'amerkel@wolfsburg42.de',
    password: 'secret123',
  },
  {
    lastname: 'Merkel',
    username: 'jmerkel',
    mail: 'amerkel2@wolfsburg42.de',
    password: 'password123',
  },
  {
    lastname: 'Lustig',
    firstname: 'Brita',
    username: 'altplustig',
    password: 'Peter123',
  },
  {
    lastname: 'Invalid',
    firstname: 'Password',
    username: 'pwnowork',
    mail: 'pwewe@mail.com',
    password: '1',
  },
  {
    lastname: '3',
    firstname: 'tooshort',
    username: '234',
    mail: 'pwewe@mail.com',
    password: 'pw2345661a',
  },
  {
    lastname: 'tooshort',
    firstname: '1',
    username: '234',
    mail: 'pwewe@mail.com',
    password: 'pw2345661a',
  },
  {
    lastname: 'Bergström',
    firstname: 'Hermann',
    username: 'hbergstroem',
    mail: 'notanemail',
    password: 'pw2345661a',
  },
  {
    lastname: 'Bergström',
    firstname: 'Hermann',
    username: 'hbergstroem',
    mail: 'notanemail',
    password: 'e',
  },
];

export default { newValidUser, newUserMissingUsername, invalidUsers };
