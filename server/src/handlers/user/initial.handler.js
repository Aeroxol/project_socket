import { addUser } from '../../session/user.session.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { gameSessions } from '../../session/sessions.js';
import { addGameSession } from '../../session/game.session.js';
import { v4 as uuidv4 } from 'uuid';
import { createUser, findUserByDeviceID, getUserPosition } from '../../db/user/user.db.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;
    console.log({ deviceId, playerId, latency });

    let userData = await findUserByDeviceID(deviceId);

    if (!userData) {
      userData = await createUser(deviceId);
    }
    const user = addUser(socket, deviceId, playerId);

    // 참가할 수 있는 방이 있는지 확인
    const emptyGame = gameSessions.find((e) => !e.isFull());
    if (!emptyGame) {
      // 만약 방이 없다면 방을 생성하고 유저를 추가
      const gameId = uuidv4();
      const newSession = addGameSession(gameId);
      newSession.addUser(user);
    } else {
      // 방이 있다면 방에 유저를 추가
      emptyGame.addUser(user);
    }

    const { last_x, last_y } = await getUserPosition(deviceId);

    // 유저 정보 응답 생성
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: deviceId, x: last_x, y: last_y }, // return initial position from db
      // deviceId,
    );

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error)
  }
};

export default initialHandler;
