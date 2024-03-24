const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('./middlewares/passport-strategy');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = 3001;

// Load config
dotenv.config();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(session
    ({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
app.use(cookieParser());
// Passport middleware
app.use(passport.initialize());

// Routes
app.use('/auth', require('./routes/auth_routes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Clockwork app listening at http://localhost:${PORT}`);
});
