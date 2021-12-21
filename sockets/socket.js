const { io } = require('../index')

// Socket messages
io.on('connection', client => {
    console.log('Client connected');

    client.on('disconnect', () => {
        console.log('Client disconneted');
    });

    client.on('message', (payload) => {
        console.log('message!!!', payload);

        // Server emits message to all connected clients
        io.emit('message', { admin: 'New message' })
    })
});