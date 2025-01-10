import net from 'net';

// client for test
const client = new net.Socket();
client.connect(3000, 'localhost', () => {
    console.log('Connected to server');
    client.write('Hello, server! Love, Client.');
});

client.on('data', (data) => {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', () => {
    console.log('Connection closed');
});