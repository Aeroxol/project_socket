import { handleError } from "../utils/error/errorHandler.js";
import CustomError from "../utils/error/customError.js"
import { removeUser } from "../session/user.session.js";
import { getUserBySocket } from "../session/user.session.js";
import { getGameSessionByUserId } from "../session/game.session.js";

export const onError = (socket) => (err) => {
  console.error('소켓 오류:', err);
  handleError(socket, new CustomError(500, `소켓 오류: ${err.message}`));
  // 세션에서 유저 삭제
  const user = getUserBySocket(socket);
  const game = getGameSessionByUserId(user.id);
  game.removeUser(user.id);
  removeUser(socket);
};
