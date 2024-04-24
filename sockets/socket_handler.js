module.exports = function (io) {
	io.on('connection', (socket) => {
		console.log('User connected');

		// Example event handler
		socket.on('exampleEvent', (data) => {
			console.log('Message received:', data);

			// Emit a response back to the client if needed
			io.emit('exampleResponse', { message: 'Event received and processed' });
		});

		socket.on('disconnect', () => {
			console.log('User disconnected');
		});
	});
};
