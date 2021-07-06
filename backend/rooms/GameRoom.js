const colyseus = require('colyseus');
const { GameState } = require('./schema/GameState');

exports.GameRoom = class extends colyseus.Room {

  onCreate (options) {
    this.setState(new GameState());
    console.log('ROOM CREATED');


    this.onMessage("select_card", (client, message) => {
    //   // handle "type" message.
    //   //
        // client.send('get_board', 'Babadoo! This is your message directly from the server!');

      console.log("BACKEND! Message 'select_card' recieved!");

      this.state.handleSelection(message);

    });

  }

  onJoin (client, options) {
    console.log(`User ${client.sessionId} Joined!`);
   
    // console.log('Backend grid: ',this.state.board);

    // client.send('get_board', stateGrid);
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
