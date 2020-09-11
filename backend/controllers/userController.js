const userModel = require("../models/userModel");
const UserUtil = require("../utils/userUtil");
const input = require("../utils/inputUtil");
const jasonWebTokenUtils = require("../utils/jasonWebTokenUtils");

module.exports = {
  // UPDATE PASSWORD

  updatePasswordWithUserId: async (req, res, next) => {
    let err;
    if ((err = input.password(req.body.password).error))
      return res.status(400).json({ message: "password " + err });
    const result = await UserUtil.verifyPasswordWithUserId(
      req.body.password,
      req.params.id
    );

    if (result.status !== "Password is valid")
      return res.status(401).json({ message: "Password is incorrect" });
    else return res.status(200).json({ message: "Password is correct" });
  },

  // LOGIN CONTROLLER

  login: async (req, res) => {
    // Refactor to destructor
    const user = await UserUtil.getUser({
      username: req.body.username,
      password: req.body.password,
    });
    if (user.error) return res.status(401).json({ message: user.error });
    else {
      const id = user.userData[0]["id"];
      const username = user.userData[0]["username"];
      return res.status(200).json({
        message: "Login succesfull!",
        username: username,
        token: jasonWebTokenUtils.tokenGenarator([id, username]),
      });
    }
  },

  // REGISTER CONTROLLER

  createUser: async (req, res) => {
    const { lastname, firstname, username, mail, password } = req.body;
    let err;

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

    const ret = await UserUtil.createUser([
      lastname,
      firstname,
      username,
      mail,
      password,
    ]);

    if (ret.status === "user created!") return res.status(201).send(ret.status);
    else return res.status(400).send(ret.status);
  },
};
