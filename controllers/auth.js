import User from '../models/Users.js';
import ErrorResponse from '../utils/errorResponse.js';

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({
			username,
			email,
			password,
		});
		sendToken(user,201,res);
	} catch (error) {
		next(error);
	}
};
export const login = async (req, res, next) => {
	const { email, password } = req.body;
	//Validar envio de correo y contraseña
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}
	try {
		const user = await User.findOne({ email }).select('+password');
		//Validar si existe usuario
		if (!user) {
			return next(new ErrorResponse('Invalid credentials', 401));
		}
		//Validar si contraseña es correcta
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return next(new ErrorResponse('Invalid password', 401));
		}
		sendToken(user,200,res);
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
export const forgotPassword = (req, res, next) => {
	res.send('forgotPassword route');
};
export const resetPassword = (req, res, next) => {
	res.send('resetPassword route');
};

const sendToken = (user,statusCode, res) =>{
	const token = user.getSignedToken();
	res.status(statusCode).json({success:true,token});
}
