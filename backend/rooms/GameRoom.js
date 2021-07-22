const colyseus = require('colyseus');
const { GameState } = require('./schema/GameState');

exports.GameRoom = class extends colyseus.Room {

  onCreate (options) {


    console.log('ROOM CREATED');
    console.log('options: ', options);
    console.log('options.maxClients: ', options.maxClients);
    if(options.maxClients){
      console.log('num maxClients provided!');
      this.maxClients=options.maxClients;
    }
    console.log('this.maxClients: ',this.maxClients);
    console.log('this.locked?: ',this.locked);


    // console.log('ROOM USERNAME: ', options.username);
    this.setState(new GameState());


    this.onMessage("select_card", (client, message) => {

      console.log("BACKEND! Message 'select_card' recieved!");
      this.state.handleSelection(client.sessionId,message);
    });

    this.onMessage("add_row", (client, message) => {  

        console.log("BACKEND! Message 'add_row' recieved!");
        this.state.board.addGridCards(this.state.deck.drawCards(3));
    });

  }

  onJoin (client, options) {
    console.log(`User ${client.sessionId} Joined!`);
   
    // console.log('Username: ', options.username);
    this.state.addPlayer(client.sessionId,options.username);
    // console.log('this.state.players: ', this.state.players);
    // console.log('Backend grid: ',this.state.board);
    console.log('this.locked?: ',this.locked);

    // client.send('get_board', stateGrid);
  }

  async onLeave (client, consented) {
    console.log(client.sessionId, "left!");
    // this.state.players[client.sessionId].active = false;

    // try {
    //   if (consented) {
    //       throw new Error("consented leave");
    //   }
  
    //   // allow disconnected client to reconnect into this room until 20 seconds
    //   await this.allowReconnection(client, 20);
  
    //   // client returned! let's re-activate it.
    //   this.state.players[client.sessionId].active = true;
  
    // } catch (e) {
  
    //   console.log('error cawt')
    //   // 20 seconds expired. let's remove the client.
    //   delete this.state.players[client.sessionId];
    // }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
