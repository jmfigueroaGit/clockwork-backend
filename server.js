// Importing necessary modules
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('./middlewares/passport-strategy');
const cookieParser = require('cookie-parser');

// Initializing express app
const app = express();
const PORT = 3001;

// Loading environment variables
dotenv.config();

// Adding middleware to the express app
app.use(express.json()); // for parsing application/json
app.use(helmet()); // for setting HTTP headers for security
app.use(morgan('dev')); // for logging HTTP requests
app.use(cors()); // for enabling CORS
app.use(session // for handling sessions
    ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
app.use(cookieParser()); // for parsing cookies

// Initializing passport middleware
app.use(passport.initialize());

// Defining routes
app.use('/auth', require('./routes/auth_routes')); // authentication routes
app.use('/users', require('./routes/user_routes')); // user routes


// Starting the server
app.listen(PORT, () => {
    console.log(`Clockwork web app listening at http://localhost:${PORT}`);
});