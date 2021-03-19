import User from '../models/Users.js';
import bcrypt from 'bcryptjs';

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
export const login = async (req, res, next) => {
	const { email,password } = req.body;
	//Validar envio de correo y contraseña
	if(!email || !password){
		res.status(400).json({success:false,error:"Please provide email and password"})
	}
	try {
		const user = await User.findOne({email}).select("+password");
		//Validar si existe usuario
		if(!user){
			res.status(404).json({success:false, error:"Invalid credentials"})
		}
		//Validar si contraseña es correcta
		const isMatch = await user.matchPassword(password);
		if(!isMatch){
			res.status(404).json({success:false, error:"Invalid password"});
		}
		res.status(200).json({ success: true, token:"asdasdsa" });

	} catch (error) {
		res.status(500).json({success:false, error:error.message});
	}
};
export const forgotPassword = (req, res, next) => {
	res.send('forgotPassword route');
};
export const resetPassword = (req, res, next) => {
	res.send('resetPassword route');
};
