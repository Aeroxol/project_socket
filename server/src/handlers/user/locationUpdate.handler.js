import { handleError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { getUserById } from "../../session/user.session.js";
import { getGameSessionByUserId } from "../../session/game.session.js";
import { PACKET_TYPE } from "../../constants/header.js";
import { createLocationResponse } from "../../utils/response/createLocationResponse.js";

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;

    // 입력받은 정보를 바탕으로 서버 업데이트
    const user = getUserById(userId);
    user.x = x;
    user.y = y;

    const gameSession = getGameSessionByUserId(userId);

    const data = [];
    for (var u of gameSession.users) {
      data.push({
        id: u.id,
        playerId: u.playerId,
        x: u.x,
        y: u.y,
      });
    }
    // 유저 정보 응답 생성
    // 소켓을 통해 게임 세션의 다른 플레이어들에게 메시지 전송
    for (var u of gameSession.users) {
      const _data = data.filter(player => player.id !== u.id);
      const locationResponse = createLocationResponse(_data);
      u.socket.write(locationResponse);
    }
  } catch (error) {
    handleError(socket, error);
  }
}

export default locationUpdateHandler;