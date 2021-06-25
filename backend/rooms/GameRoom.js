const colyseus = require('colyseus');
const { GameState } = require('./schema/GameState');

exports.GameRoom = class extends colyseus.Room {

  onCreate (options) {
    this.setState(new GameState());
    console.log('ROOM CREATED');


    this.onMessage("select_piece", (client, message) => {
      //
      // handle "type" message.
      //
      this.state.board.selectPiece();
    });

  }

  onJoin (client, options) {
    // this.state.sayHello();
    console.log(client.sessionId, "GAMER GAMEY GAME ROOM joined!");
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
