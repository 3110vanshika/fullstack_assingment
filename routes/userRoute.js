const express = require('express');
const { userSignup, userSignin, verifyEmail, resetPassword } = require('../controller/userController');

const router = express.Router()

router.post('/signup', userSignup)

router.post('/signin', userSignin)

router.post('/verify-email', verifyEmail)

router.post('/reset-password/:OTP', resetPassword);

module.exports = router;