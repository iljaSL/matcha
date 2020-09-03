const userModel = require("../models/userModel");
const UserUtil = require("../utils/userUtil");
const input = require("../utils/inputUtil");

module.exports = {
  createUser: async (req, res) => {
    const { lastname, firstname, username, mail, password } = req.body;
    //Check inputs
    let err;
    console.log(req.body);
    if ((err = input.lastname(lastname).error))
      return res.status(400).json({ error: "lastname " + err });
    if ((err = input.firstname(firstname).error))
      return res.status(400).json({ error: "firstname " + err });
    if ((err = input.password(password).error))
      return res.status(400).json({ error: "password " + err });

    err = await input.username(username);
    if (err) return res.status(400).json({ error: "username " + err.error });
    err = await input.mail(mail);
    if (err) return res.status(400).json({ error: "mail " + err.error });

    //Create new user
    let ret = await UserUtil.createUser([
      lastname,
      firstname,
      username,
      mail,
      password,
    ]);
    if (ret.status === "User created with success")
      return res.status(201).send(ret.status);
    else return res.status(400).send(ret.status);
  },
};
