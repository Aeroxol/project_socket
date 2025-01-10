import net from 'net';

const server = net.createServer((socket) => {
    console.log('A user connected');

    socket.on('data', (data) => {
        console.log('Message received: ' + data);
    });
    
    socket.on('end', () => {
        console.log('User disconnected');
    });

    socket.on('error', (error) => {
        console.error('Socket error: ' + error.message);
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});