import { handleError } from "../utils/error/errorHandler.js";
import { createResponse } from "../utils/response/createResponse.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../constants/handlerIds.js";

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;

    //console.log({ x, y });
    return;
    // 유저 정보 응답 생성
    const locationResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      {  }, // return initial position from db
      // deviceId,
    );

    console.log('locationResponse');
    console.log(locationResponse);
    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(locationResponse);
  } catch (error) {
    handleError(socket, error)
  }
}

export default locationUpdateHandler;