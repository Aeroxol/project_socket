import { PORT, HOST, CLIENT_VERSION } from '../constants/env.js';
import { PACKET_TYPE, TOTAL_LENGTH } from '../constants/header.js';

export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  client: {
    version: CLIENT_VERSION,
  },
  packet: {
    totalLength: TOTAL_LENGTH,
    typeLength: PACKET_TYPE,
  },
  // 필요한 만큼 추가
};