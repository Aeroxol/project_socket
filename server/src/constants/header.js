export const TOTAL_LENGTH = 4; // 전체 길이를 나타내는 4바이트
export const PACKET_TYPE_LENGTH = 1; // 패킷타입을 나타내는 1바이트
export const MAX_MESSAGE_LENGTH = 1024;

export const PACKET_TYPE = {
    PING: 0,
    NORMAL: 1,
    LocationUpdate: 3,
};