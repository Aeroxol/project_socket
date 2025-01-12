import net from 'net';
import { readHeader, writeHeader } from './src/utils.js';
import { HANDLER_ID, MAX_MESSAGE_LENGTH, TOTAL_LENGTH_SIZE } from './src/constants.js';
import handlers from './src/handlers/index.js';

const server = net.createServer((socket) => {
    console.log('A user connected');

    socket.on('data', (data) => {
        const buffer = Buffer.from(data);
        var { length, handlerId } = readHeader(buffer);

        if (length > MAX_MESSAGE_LENGTH) {
            console.error('Message length exceeds maximum allowed length');
            socket.write('')
            socket.end();
            return;
        }

        if (!handlers[handlerId]) {
            console.error(`Handler with ID ${handlerId} not found`);
            socket.write('Handler not found');
            socket.end();
            return;
        }

        const handler = handlers[handlerId];
        if (!handler) {
            console.error('Handler is not defined');
            socket.write('Handler is not defined');
            socket.end();
            return;
        }

        const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
        const message = buffer.slice(headerSize);

        const responseMessage = handler(message);
        const responseBuffer = Buffer.from(responseMessage);

        const header = writeHeader(responseBuffer.length, handlerId);
        const responsePacket = Buffer.concat([header, responseBuffer]);

        socket.write(responsePacket);
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