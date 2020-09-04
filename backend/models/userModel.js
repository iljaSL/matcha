const pool = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  registerUser: async (data) => {
    console.log(data[4]);
    const salt = bcrypt.genSaltSync(saltRounds);
    data[4] = bcrypt.hashSync(data[4], salt);
    console.log(data);
    try {
      const result = await pool.query({
        sql:
          "INSERT INTO users (lastname, firstname, username, mail, password, `key`) VALUES (?)",
        values: [data],
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error("query failed");
    }
  },
};
