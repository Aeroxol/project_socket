import net from 'net';
import initServer from './src/init/index.js';
import { config } from './src/config/config.js';
import { onConnection } from './src/events/onConnection.js';

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