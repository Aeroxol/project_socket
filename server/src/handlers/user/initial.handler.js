import { addUser } from '../../session/user.session.js';

const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId } = payload;

    addUser(socket, deviceId);
    
    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write("");
};

export default initialHandler;