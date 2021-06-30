const colyseus = require('colyseus');
const { GameState } = require('./schema/GameState');

exports.GameRoom = class extends colyseus.Room {

  onCreate (options) {
    this.setState(new GameState());
    console.log('ROOM CREATED');


    this.onMessage("get_board", (client, message) => {
    //   // handle "type" message.
    //   //
        // client.send('get_board', 'Babadoo! This is your message directly from the server!');
    });

  }

  onJoin (client, options) {
    console.log(`User ${client.sessionId} Joined!`);
    let stateGrid = this.state.board.grid;
    // let feGrid;
    // for(let cell of Object.keys(stateGrid)){

    //   if(stateGrid[cell].card){

    //     console.log('stateGrid[cell].card: ', stateGrid[cell].card);
    //     feGrid[cell] = stateGrid[cell];
    //   }
    // }

   
    // console.log('Backend grid: ', JSON.stringify(feGrid));
    // console.log('Backend grid: ', this.state.board.grid);
    client.send('get_board', stateGrid);
  }

  onLeave (client, consented) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
