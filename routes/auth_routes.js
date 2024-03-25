const express = require('express');
const router = express.Router();
const {
	register,
	login,
	me,
	logout,
	forgetPassword,
	resetPassword,
	refreshToken,
	sendAccountVerificationEmail,
	verifyAccount,
	changePassword,
} = require('../controllers/auth_controllers');
const { authenticate, verify } = require('../middlewares/auth_middleware');

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for getting user details, requires authentication and verification
router.get('/me', authenticate, verify, me);

// Route for user logout, requires authentication
router.get('/logout', authenticate, logout);

// Route for forgetting password
router.post('/forget-password', forgetPassword);

// Route for resetting password
router.put('/reset-password', resetPassword);

// Route for refreshing token, requires authentication
router.get('/refresh-token', authenticate, refreshToken);

// Route for sending account verification email, requires authentication
router.get('/send-verification', authenticate, sendAccountVerificationEmail);

// Route for verifying account
router.put('/verify-account', verifyAccount);

// Route for changing password, requires authentication
router.put('/change-password', authenticate, changePassword);

module.exports = router;
