const MAX_PLAYERS = 24;

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error('Game session is full');
    }
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);

    if (this.users.length < MAX_PLAYERS) {
      this.state = 'waiting';
    }
  }

  isFull(){
    return this.users.length >= MAX_PLAYERS ? true : false;
  }
}

export default Game;
