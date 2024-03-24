// Importing necessary modules and functions
const User = require("../classes/User");
const { verifyToken } = require("../utils/token");

// Middleware function to authenticate a user
const authenticate = async (req, res, next) => {
    try {
        // Extracting the token from the request cookies
        const token = req.cookies.token;

        // If there's no token, throw an error
        if (!token) {
            throw new Error('Unauthorized');
        }

        // Verifying the token and getting the payload
        const payload = verifyToken(token);

        // Finding the user associated with the id in the payload and attaching it to the request
        req.user = await User.find(payload.id);

        // Proceeding to the next middleware function
        next();
    } catch (error) {
        // If there's an error, respond with a 401 Unauthorized status code and the error message
        res.status(401).json({ message: error.message });
    }
};

// Middleware function to authorize a user based on their role
const authorize = (roles) => {
    return (req, res, next) => {
        // If the user's role is not included in the allowed roles, respond with a 403 Forbidden status code
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // If the user's role is allowed, proceed to the next middleware function
        next();
    };
};

// Middleware function to check if a user is verified
const verify = (req, res, next) => {
    // If the user is not verified, respond with a 403 Forbidden status code
    if (!req.user.is_verified) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    // If the user is verified, proceed to the next middleware function
    next();
};

// Exporting the middleware functions
module.exports = { authenticate, authorize, verify };