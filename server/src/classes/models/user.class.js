import { createPingPacket } from "../../utils/notification/game.notification.js";

class User {
  constructor(id, playerId, socket) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.prev_x = 0;
    this.prev_y = 0;
    this.sequence = 0;
    this.latency = 1;
    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, y) {
    this.prev_x = x;
    this.prev_y = y;
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  getNextSequence() {
    return ++this.sequence;
  }

  ping() {
    const now = Date.now();

    console.log(`${this.id}: ping`);
    this.socket.write(createPingPacket(now));
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    // console.log(`Received pong from user ${this.id} at ${now} with latency ${this.latency}ms`);
  }
}

export default User;
