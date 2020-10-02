const userModel = require('../models/userModel');
const UserUtil = require('../utils/userUtil');
const input = require('../utils/inputUtil');
const jasonWebTokenUtils = require('../utils/jasonWebTokenUtils');

module.exports = {
	// UPDATE PASSWORD

	verifyPasswordWithUserId: async (req, res) => {
		let err;
		if ((err = input.password(req.body.password).error))
			return res.status(400).json({ message: 'password ' + err });
		const result = await UserUtil.verifyPasswordWithUserId(
			req.body.password,
			req.params.id
		);
		if (result.status !== 'Password is correct')
			return res.status(401).json({ message: 'Password is incorrect' });
		else return res.status(200).json({ message: 'Password is correct' });
	},

	// LOGIN CONTROLLER

	login: async (request, response) => {
		const user = await UserUtil.getUser({
			username: request.body.username,
			password: request.body.password,
		});
		if (user.error) return response.status(401).json({ message: user.error });
		else {
			const id = user.userData[0]['id'];
			const username = user.userData[0]['username'];
			return response.status(200).json({
				message: 'Login succesfull!',
				username: username,
				token: jasonWebTokenUtils.tokenGenarator([id, username]),
			});
		}
	},

	// REGISTER CONTROLLER

	createUser: async (request, response, err) => {
		const { lastname, firstname, username, mail, password } = request.body;

		if ((err = input.lastname(lastname).error))
			return response.status(400).json({ error: err });
		if ((err = input.firstname(firstname).error))
			return response.status(400).json({ error: err });
		if ((err = input.password(password).error))
			return response.status(400).json({ error: err });

		err = await input.username(username);
		if (err) return response.status(400).json({ error: err.error });
		err = await input.mail(mail);
		if (err) return response.status(400).json({ error: err.error });

		const result = await UserUtil.createUser([
			lastname,
			firstname,
			username,
			mail,
			password,
		]);

		if (result.status === 'User created with success')
			return response.status(201).send(result.status);
		else return response.status(400).send(result.status);
	},
};
