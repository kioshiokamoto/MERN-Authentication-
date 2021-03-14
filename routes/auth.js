import express from 'express';

const router = express.Router();

import { register, login, forgotPassword, resetPassword } from '../controllers/auth.js'

//router.route('/register').post(); //Otra forma de utilizar el router
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

export default router;