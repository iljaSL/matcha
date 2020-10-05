const userModel = require('../models/userModel');
const UserUtil = require('../utils/userUtil');
const input = require('../utils/inputUtil');
const jasonWebTokenUtils = require('../utils/jasonWebTokenUtils');

module.exports = {
	updatePasswordWithUserId: async (request, response, err) => {
		if ((err = input.password(request.body.password).error))
			return response.status(400).json({ message: err });

		const result = await UserUtil.updatePasswordWithUserId(
			request.body.password,
			request.params.id
		);

		if (result.status !== 'Password has been updated!')
			return response
				.status(401)
				.json({ message: 'Password could not be updated' });
		else {
			return response.status(200).json({ message: 'Password updated!' });
		}
	},

	// UPDATE PASSWORD

	verifyPasswordWithUserId: async (request, response, err) => {
		if ((err = input.password(request.body.password).error))
			return response.status(400).json({ message: err });
		const result = await UserUtil.verifyPasswordWithUserId(
			request.body.password,
			request.params.id
		);
		if (!result)
		    return response.status(404).json({ message: "no such user"})
		if (result.status !== 'Password is correct')
			return response.status(401).json({ message: 'Password is incorrect' });
		else return response.status(200).json({ message: 'Password is correct' });
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
