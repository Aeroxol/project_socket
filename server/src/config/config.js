import { PORT, HOST, CLIENT_VERSION } from '../constants/env.js';
import { PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';
import {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} from '../constants/env.js';

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
    typeLength: PACKET_TYPE_LENGTH,
  },
  databases: {
    USER_DB: {
      name: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
    // 필요한 만큼 추가
  },
  // 필요한 만큼 추가
};