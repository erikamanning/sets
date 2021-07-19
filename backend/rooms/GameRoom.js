const colyseus = require('colyseus');
const { GameState } = require('./schema/GameState');

exports.GameRoom = class extends colyseus.Room {

  onCreate (options) {
    console.log('ROOM CREATED');
    // console.log('ROOM USERNAME: ', options.username);
    this.setState(new GameState());


    this.onMessage("select_card", (client, message) => {

      console.log("BACKEND! Message 'select_card' recieved!");
      this.state.handleSelection(message);
    });

    this.onMessage("add_row", (client, message) => {  

        console.log("BACKEND! Message 'add_row' recieved!");
        this.state.board.addGridCards(this.state.deck.drawCards(3));
    });

  }

  onJoin (client, options) {
    console.log(`User ${client.sessionId} Joined!`);
   
    console.log('Username: ', options.username);
    this.state.addPlayer(options.username);
    // console.log('this.state.players: ', this.state.players);
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
