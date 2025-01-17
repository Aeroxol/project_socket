import { handleError } from "../../utils/error/errorHandler.js";
import { getUserById } from "../../session/user.session.js";
import { getGameSessionByUserId } from "../../session/game.session.js";
import { createLocationResponse } from "../../utils/response/createLocationResponse.js";

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;

    // 입력받은 정보를 바탕으로 서버 업데이트
    const user = getUserById(userId);
    user.updatePosition(x, y);

    const gameSession = getGameSessionByUserId(userId);
    const latency = gameSession.users.reduce((acc, cur) => acc + cur.latency, 0) / gameSession.users.length;

    const data = gameSession.users.map(u => {
      const predict_x = u.x + (u.x - u.prev_x) * 30 * latency / 1000;
      const predict_y = u.y + (u.y - u.prev_y) * 30 * latency / 1000;

      return {
        id: u.id,
        playerId: u.playerId,
        x: predict_x,
        y: predict_y,
      };
    });

    // 유저 정보 응답 생성
    // 소켓을 통해 게임 세션의 다른 플레이어들에게 메시지 전송
    for (var u of gameSession.users) {
      const _data = data.filter(player => player.id !== u.id);
      console.log(`user: ${userId} | data: ${_data}`);
      const locationResponse = createLocationResponse(_data);
      u.socket.write(locationResponse);
    }
  } catch (error) {
    handleError(socket, error);
  }
}

export default locationUpdateHandler;