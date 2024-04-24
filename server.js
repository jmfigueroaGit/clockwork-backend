// Importing necessary modules
const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const passport = require('./middlewares/passport-strategy');
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');
const http = require('http');
const socketMiddleware = require('./sockets/socket_middleware');
const socketHandler = require('./sockets/socket_handler');

// Initializing express app
const app = express();
const PORT = 3001;

// Loading environment variables
dotenv.config();

// Adding middleware to the express app
app.use(express.json()); // for parsing application/json
app.use(helmet()); // for setting HTTP headers for security
app.use(morgan('dev')); // for logging HTTP requests
app.use(
	cors({
		origin: 'http://localhost:4200',
		credentials: true,
	})
); // for enabling CORS
app.use(
	session(
		// for handling sessions
		{
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: true,
		}
	)
);
app.use(cookieParser()); // for parsing cookies

// Initializing passport middleware
app.use(passport.initialize());

// Defining routes
app.use('/api/auth', require('./routes/auth_routes')); // authentication routes
app.use('/api/users', require('./routes/user_routes')); // user routes
app.use('/api/activities', require('./routes/activity_routes')); // activity routes
app.use('/api/member_activities', require('./routes/member_activity_routes')); // member_activity routes
app.use('/api/projects', require('./routes/project_routes')); // project routes
app.use('/api/activity_projects', require('./routes/activity_project_routes')); // activity_project routes

// Set up Socket.IO server with HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = socketIO(server, {
	cors: {
		origin: 'http://localhost:4200',
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // comment this on test and prod server
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
		allowedHeaders: [
			'my-custom-header',
			'Access-Control-Allow-Headers',
			'access-control-allow-credentials',
			'Origin',
			'Accept',
			'X-Requested-With, Content-Type',
			'Access-Control-Request-Method',
			'Access-Control-Request-Headers',
		], // comment this on test and prod server
		transports: ['websocket', 'polling'],
	},
});

// Middleware for handling socket connections
io.use(socketMiddleware);

// Handling socket connections
io.on('connection', socketHandler);

// Starting the server
app.listen(PORT, () => {
	console.log(`Clockwork web app listening at http://localhost:${PORT}`);
});
