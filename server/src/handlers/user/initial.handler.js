import { addUser } from '../../session/user.session.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { gameSessions } from '../../session/sessions.js';
import { addGameSession } from '../../session/game.session.js';
import User from '../../classes/models/user.class.js';
import {v4 as uuidv4} from 'uuid';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;

    addUser(socket, deviceId);

    const user = new User(deviceId, playerId, socket);
    
    // 참가할 수 있는 방이 있는지 확인
    const emptyGame = gameSessions.find((e) => !e.isFull());
    if(!emptyGame){
      // 만약 방이 없다면 방을 생성하고 유저를 추가
      const gameId = uuidv4();
      const newSession = addGameSession(gameId);
      newSession.addUser(user);
    }else{
      // 방이 있다면 방에 유저를 추가
      emptyGame.addUser(user);
    }

    // 유저 정보 응답 생성
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: deviceId, x: 0, y: 0 }, // return initial position from db
      // deviceId,
    );

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error)
  }
};

export default initialHandler;
