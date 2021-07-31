const colyseus = require('colyseus');
const { GameState } = require('./schema/GameState');

exports.GameRoom = class extends colyseus.Room {

  onCreate (options) {

    if(options.maxClients){
      this.maxClients=options.maxClients;
    }

    console.log('ROOM CREATED');
    this.setState(new GameState(false,options.mode));

    this.onMessage("select_card", (client, message) => {

      console.log("BACKEND! Message 'select_card' recieved!");
      this.state.handleSelection(client.sessionId,message);
    });

    this.onMessage("add_row", (client, message) => {  

        console.log("BACKEND! Message 'add_row' recieved!");
        this.state.board.addGridCards(this.state.deck.drawCards(3));
    });

    this.onMessage("all_in", (client, message) => {  

      console.log("BACKEND! Message 'all_in' recieved! Game starting!");
      this.lock();
      this.state.started=true;
    });

    this.onMessage("quit", (client, message) => {  

      console.log("BACKEND! Message 'quit' recieved! Getting game result!");
      this.state.getGameResult();
    });

    this.onMessage("ready", (client, message) => {  

      console.log("BACKEND! Message 'ready' recieved! Changing player to ready!");
      this.state.players.get(client.sessionId).ready=true;
      if(this.state.checkAllReady()){
        console.log('Everyone is ready!');
        this.state.allReady=true;
        this.lock();
      }
      else{
        console.log('Not everyone is ready yet!');
      }
    });

    this.onMessage("not_ready", (client, message) => {  

      console.log("BACKEND! Message 'not_ready' recieved! Changing player to rNOT eady!");
      this.state.players.get(client.sessionId).ready=false;
      this.state.allReady=false;

    });
  }

  onJoin (client, options) {
    // console.log(`User ${client.sessionId} Joined!`);
    console.log(`User ${options.username} Joined!`);
    this.state.addPlayer(client.sessionId,options.username);
  }

  async onLeave (client, consented) {
    // console.log(this.state.players.get(client.sessionId).username, "left!");

    // this.state.removePlayer(client.sessionId);

    console.log(client.sessionId, "left!");
    this.state.getGameResult();
    // this.disconnect();
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
