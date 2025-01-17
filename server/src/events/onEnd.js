import { updateUserPosition } from '../db/user/user.db.js';
import { getGameSessionByUserId } from '../session/game.session.js';
import { getUserBySocket, removeUser } from '../session/user.session.js';
import { findUserByDeviceID } from '../db/user/user.db.js';

export const onEnd = (socket) => async () => {
  const user = getUserBySocket(socket);
  const game = getGameSessionByUserId(user.id);
  game.removeUser(user.id);
  let userData = await findUserByDeviceID(user.id);
  await updateUserPosition(userData.id, user.x, user.y);
  
  removeUser(socket);
  console.log('클라이언트 연결이 종료되었습니다.');
};