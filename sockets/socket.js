const socketIO = require('socket.io');
const http = require('http');

// Create HTTP server
const server = http.createServer();

// Initialize Socket.IO server
const io = socketIO(server, {
	cors: {
		origin: 'http://localhost:4200', // Adjust origin as needed
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
io.use((socket, next) => {
	// Custom middleware logic for socket connections
	// You can add authentication or other checks here
	next();
});

// Handling socket connections
io.on('connection', (socket) => {
	console.log('A user connected');

	// Example event handler
	socket.on('exampleEvent', (data) => {
		console.log('Event:', data);
		// Process data or interact with services
		// Example: Emit a response back to the client
		io.emit('exampleResponse', { message: 'Event received and processed' });
	});

	// Disconnect event handler
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

// Start the server on port 3002
const PORT = 3002;
server.listen(PORT, () => {
	console.log(`Socket server listening on port ${PORT}`);
});
