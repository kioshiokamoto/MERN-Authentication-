import User from '../models/Users.js';

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({
			username,
			email,
			password,
		});
		res.status(201).json({ success: true, user });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
export const login = (req, res, next) => {
	res.send('login route');
};
export const forgotPassword = (req, res, next) => {
	res.send('forgotPassword route');
};
export const resetPassword = (req, res, next) => {
	res.send('resetPassword route');
};
