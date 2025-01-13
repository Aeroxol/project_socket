import net from 'net';
import initServer from './src/init/index.js';
import { config } from './src/config/config.js';
import { onConnection } from './src/events/onConnection.js';

// const server = net.createServer((socket) => {
//     console.log('A user connected');

//     socket.on('data', (data) => {
//         const buffer = Buffer.from(data);
//         var { length, handlerId } = readHeader(buffer);

//         if (length > MAX_MESSAGE_LENGTH) {
//             console.error('Message length exceeds maximum allowed length');
//             socket.write('')
//             socket.end();
//             return;
//         }

//         if (!handlers[handlerId]) {
//             console.error(`Handler with ID ${handlerId} not found`);
//             socket.write('Handler not found');
//             socket.end();
//             return;
//         }

//         const handler = handlers[handlerId];
//         if (!handler) {
//             console.error('Handler is not defined');
//             socket.write('Handler is not defined');
//             socket.end();
//             return;
//         }

//         const headerSize = TOTAL_LENGTH + PACKET_TYPE_LENGTH;
//         const message = buffer.slice(headerSize);

//         const responseMessage = handler(message);
//         const responseBuffer = Buffer.from(responseMessage);

//         const header = writeHeader(responseBuffer.length, handlerId);
//         const responsePacket = Buffer.concat([header, responseBuffer]);

//         socket.write(responsePacket);
//     });

//     socket.on('end', () => {
//         console.log('User disconnected');
//     });

//     socket.on('error', (error) => {
//         console.error('Socket error: ' + error.message);
//     })
// });

const server = net.createServer(onConnection);

initServer()
    .then(() => {
        server.listen(config.server.port, () => {
            console.log(`Server is running on port ${config.server.port}`);
        });
    })
    .catch((error) => {
        console.error(error);
        process.exit(1); // 오류 발생 시 프로세스 종료
    });