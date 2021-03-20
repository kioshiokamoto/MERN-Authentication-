import User from '../models/Users.js';
import ErrorResponse from '../utils/errorResponse.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		const user = await User.create({
			username,
			email,
			password,
		});
		sendToken(user, 201, res);
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
		sendToken(user, 200, res);
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};
export const forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorResponse('Email could not be send', 404));
		}

		const resetToken = user.getResetPasswordToken();

		await user.save();

		const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

		const message = `
		<h1>You have requested a password reset</h1>
		<p>Please make a put request to the following link:</p>
		<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
		`;

		try {
			await sendEmail({
				to: user.email,
				subject: 'Password reset request',
				text: message,
			});

			res.status(200).json({ success: true, data: 'Email Sent' });
		} catch (error) {
			user.resetPasswordToken = undefined;
			uset.resetPasswordExpire = undefined;
			await user.save();

			return next(new ErrorResponse('Email could not be send', 500));
		}
	} catch (error) {
		next(error);
	}
};
export const resetPassword = async (req, res, next) => {
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: {
				$gt: Date.now(),
			},
		});
		if(!user){
			return next(new ErrorResponse("Invalid reset token",400));
		}
		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire= undefined;

		await user.save();

		res.status(201).json({success:true,data:'Password Reset success'})
	} catch (error) {
		next(error)
	}
};

//Para crear token
const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken();
	res.status(statusCode).json({ success: true, token });
};
