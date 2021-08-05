const colyseus = require('colyseus');
const { GameState } = require('./schema/GameState');

let timeout;
let count = 0;

exports.GameRoom = class extends colyseus.Room {

  onCreate (options) {

    this.clock.start();
    this.minPlayers=options.minPlayers;

    if(options.maxClients){
      this.maxClients=options.maxClients;
    }

    console.log('ROOM CREATED');
    this.setState(new GameState(false,options.mode));

    /* SELECT A CARD */
    this.onMessage("select_card", (client, message) => {

      console.log('Received message to select card!');

      if(this.state.turn===client.sessionId && count<3){
        count++;
        console.log('Increasing count to: ', count);;
      }
      if(this.state.turn===client.sessionId && count ===3){
        console.log('Count === 3');
        this.state.checkSelection(this.state.turn);
        this.state.turn='any'
        timeout.clear();
        count=0;
      }

      console.log('You: ', client.sessionId);
      console.log('this.state.turn: ', this.state.turn);
      // CHECK IF IT'S PLAYERS TURN:
      if(this.state.turn==='any'){

        console.log(`Anyone's turn!`);

        this.state.turn = client.sessionId;

        timeout = this.clock.setTimeout(() => {
          console.log('3 seconds passed!')
          // clear selected cards, if any
          if(this.state.board.selectedCards.size > 0){
            console.log('selected cards >0, running check selection code!')
            this.state.checkSelection(this.state.turn);
          }
          this.state.turn='any'
          
        }, 3000);

        this.state.handleSelection(client.sessionId,message);
      }
      else if(this.state.turn===client.sessionId){
        console.log(`${this.state.players.get(client.sessionId).username}'s turn!`);
        this.state.handleSelection(client.sessionId,message);
      }
      else{
        console.log('Cannot select! Not your turn!');
      }
    });

    this.onMessage("add_row", (client, message) => {  

        console.log("BACKEND! Message 'add_row' recieved!");
        this.state.board.addRow(this.state.deck.drawCards(3));
    });

    this.onMessage("start_game", (client, message) => {  

      console.log("BACKEND! Message 'start_game' recieved! Game starting!");
        this.state.started=true;
    });

    this.onMessage("quit", (client, message) => {  

      console.log("BACKEND! Message 'quit' recieved! Getting game result!");
      this.state.getGameResult();
    });

    this.onMessage("ready", (client, message) => {  

      console.log("BACKEND! Message 'ready' recieved! Changing player to ready!");
      this.state.players.get(client.sessionId).ready=true;
      if(this.state.players.size >= this.minPlayers){
        if(this.state.checkAllReady()){
          console.log('Everyone is ready!');
          this.state.allReady=true;
          this.lock();
        }        
      }
      else{
        console.log('Not everyone is ready yet!/ not enough players');
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
