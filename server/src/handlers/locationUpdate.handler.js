import { handleError } from "../utils/error/errorHandler.js";

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;

    console.log({ x, y });

    // 유저 정보 응답 생성
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: deviceId, x: 0, y: 0 }, // return initial position from db
      // deviceId,
    );

    console.log('initialResponse');
    console.log(initialResponse);
    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error)
  }
}

export default locationUpdateHandler;