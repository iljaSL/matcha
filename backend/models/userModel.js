const pool = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = {
	findUser: async (field, data) => {
		try {
			const result = await pool.query({
				sql: 'SELECT * FROM ?? WHERE ?? = ?',
				values: ['users', field, data],
			});
			if (result) return result;
		} catch (err) {
			console.log(err);
			throw new Error(err);
		}
	},

	registerUser: async (data) => {
		const saltRounds = 10;
		console.log(data[4]);
		const salt = bcrypt.genSaltSync(saltRounds);
		data[4] = bcrypt.hashSync(data[4], salt);
		console.log(data);
		try {
			const result = await pool.query({
				sql:
					'INSERT INTO users (lastname, firstname, username, mail, password, `key`) VALUES (?)',
				values: [data],
			});
			return result.affectedRows;
		} catch (err) {
			throw new Error('query failed');
		}
	},
};
