// Importing necessary modules and functions
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../classes/User');
const Auth = require('../classes/Auth');
const { generateToken } = require('../utils/token');

// Function to register a new user
const register = async (req, res) => {
	try {
		// Destructuring request body
		const { username, email, role, password } = req.body;

		// Creating a new user
		const user = await Auth.create(username, email, role, password);

		// Sending a success response
		res.status(201).json({
			message: 'User registered successfully',
			data: user,
		});
	} catch (error) {
		// Logging the error and sending an error response
		console.log(error);
		res.status(500).json({
			message: error.message,
		});
	}
};

// Function to login a user
const login = async (req, res) => {
	try {
		// Destructuring request body
		const { username, password } = req.body;

		// If cookie is not clear
		if (req.cookies.token) {
			// Clearing the token cookie
			res.clearCookie('token');
		}

		// Authenticating the user
		const member = await Auth.authenticate(username, password);

		// Generating a token for the authenticated user
		const token = generateToken({
			id: member.id,
			role: member.role,
		});

		// Setting the token as a cookie
		res.cookie('token', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 3600000,
			path: '/',
			domain: 'localhost',
		});

		// Sending a success response with the token
		res.status(200).json({
			token,
		});
	} catch (error) {
		// Sending an error response
		res.status(500).json({
			message: error.message,
		});
	}
};

// Function to get the current user
const me = async (req, res) => {
	try {
		// Getting the current user from the request
		const user = req.user;

		// Sending a success response with the user data
		res.status(200).json({
			data: user,
		});
	} catch (error) {
		// Sending an error response
		res.status(500).json({
			message: error.message,
		});
	}
};

// Function to logout a user
const logout = async (req, res) => {
	// Clearing the token cookie
	res.clearCookie('token');

	// Sending a success response
	res.status(200).json({
		message: 'User logged out successfully',
	});
};

// Function to forget password
const forgetPassword = async (req, res) => {
	try {
		// Destructuring request body
		const { email } = req.body;

		// Generating a token for the user
		const resetToken = await User.resetToken(email);

		// Sending the reset password email
		// await sendEmail({
		//     to: email,
		//     subject: 'Password Reset',
		//     text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
		//     Please click on the following link, or paste this into your browser to complete the process:\n\n
		//     http://${req.headers.host}/reset/${resetToken}\n\n
		//     If you did not request this, please ignore this email and your password will remain unchanged.\n`
		// });

		// Sending a success response
		res.status(200).json({
			message: 'Password reset email sent successfully',
			resetToken,
		});
	} catch (error) {
		// Sending an error response
		res.status(500).json({
			message: error.message,
		});
	}
};

// Function to reset password
const resetPassword = async (req, res) => {
	try {
		// Destructuring request body
		const { resetToken, password } = req.body;

		// Resetting the password
		const { message } = await User.resetPassword(resetToken, password);

		// Sending a success response
		res.status(200).json({
			message,
		});
	} catch (error) {
		// Sending an error response
		res.status(500).json({
			message: error.message,
		});
	}
};

// Function to refresh the token
const refreshToken = async (req, res) => {
	try {
		// Getting the token from the request
		const token = req.cookies.token;

		// If token is not present
		if (!token) {
			// Sending an error response
			return res.status(401).json({
				message: 'Unauthorized',
			});
		}

		// Verifying the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Generating a new token
		const newToken = generateToken({
			id: decoded.id,
			role: decoded.role,
		});

		// Setting the new token as a cookie
		res.cookie('token', newToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 3600000,
			path: '/',
			domain: 'localhost',
		});

		// Sending a success response with the new token
		res.status(200).json({
			token: newToken,
		});
	} catch (error) {
		// Sending an error response
		res.status(500).json({
			message: error.message,
		});
	}
};

// Function to verify the account using the sending email verification
const sendAccountVerificationEmail = async (req, res) => {
	try {
		// Destructuring request body
		const { email } = req.user;

		// Generating a token for the user
		const verifyToken = await User.verifyAccount(email);

		// Sending the reset password email
		// await sendEmail({
		//     to: email,
		//     subject: 'Account Verification',
		//     text: `You are receiving this email because you (or someone else) have requested the verification of your account.\n\n
		//     Please click on the following link, or paste this into your browser to complete the process:\n\n
		//     http://${req.headers.host}/verify/${verifyToken}\n\n
		//     If you did not request this, please ignore this email and your account will remain unverified.\n`
		// });

		// Sending a success response
		res.status(200).json({
			message: 'Account verification email sent successfully',
			verifyToken,
		});
	} catch (error) {
		// Sending an error response
		res.status(500).json({
			message: error.message,
		});
	}
};

// Function to verify the account using the token
const verifyAccount = async (req, res) => {
	try {
		// Destructuring request body
		const { verifyToken } = req.body;

		// Verifying the account
		const { message } = await User.verifyVerificationToken(verifyToken);

		// Sending a success response
		res.status(200).json({
			message,
		});
	} catch (error) {
		// Sending an error response
		res.status(500).json({
			message: error.message,
		});
	}
};

// Function to change password using new password
const changePassword = async (req, res) => {
	try {
		// Destructuring request body
		const { oldPassword, newPassword } = req.body;

		// Getting the current user from the request
		const user = req.user;

		// Get password using email and username
		const password = await User.getPassword(user.email, user.username);

		// Comparing the old password with the current password
		const isMatch = await bcrypt.compare(oldPassword, password);

		// If the passwords don't match, throw an error
		if (!isMatch) {
			throw new Error('Invalid password');
		}

		// Changing the password
		const { message } = await User.changePassword(user.email, newPassword);

		// Sending a success response
		res.status(200).json({
			message,
		});
	} catch (error) {
		// Sending an error response
		res.status(500).json({
			message: error.message,
		});
	}
};

// Exporting the functions
module.exports = {
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
};
