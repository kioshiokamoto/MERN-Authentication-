import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide a username'],
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
    password:{
        type:String,
        required:[true,"Please add a password"],
        minlength:6,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date
});

const User = new mongoose.model('User', UserSchema);

export default User;
