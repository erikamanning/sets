const colyseus = require('colyseus');
const { GameState } = require('./schema/GameState');
const Game = require('../models/game');
const { saveGame } = require('../models/game');
let timeout;

exports.GameRoom = class extends colyseus.Room {

  onCreate (options) {

    console.log('CREATING ROOM...');
    this.playerLog={};
    this.clock.start();
    this.setMetadata({players:[]});
    this.minPlayers=options.minPlayers;
    if(options.maxClients)this.maxClients=options.maxClients;

    this.setState(new GameState(true,options.mode));
    // this.setState(new GameState(false,options.mode));

    /* SELECT A CARD */
    this.onMessage("select_card", (client, message) => {

      // check if single or multiplayer mode
      if(options.mode==='multiplayer'){

        // check whose turn it is
        if(this.state.turn==='any'){

          this.state.turn = client.sessionId;
          this.state.board.selectCard(message);

          timeout = this.clock.setTimeout(() => {
            this.state.checkSelection(this.state.turn);
            this.state.turn='any';
          }, 4000);
        }
        else if(this.state.turn===client.sessionId){
          this.state.board.selectCard(message);
          if(this.state.board.selectedCards.size===3){
            this.state.checkSelection(client.sessionId);
            timeout.pause();
            timeout.clear();
            this.state.turn='any';
          }
        }
        else{
          console.log('Cannot select! Not your turn!');
        }
      }
      else{
        this.state.board.selectCard(message);
        if(this.state.board.selectedCards.size===3){
          this.state.checkSelection(client.sessionId);
        }
      }

      if(this.state.noSetsNoCards){
        this.broadcast('noSets_noCards', 'aint no dang sets or cards left');
        this.state.getGameResults();
      }
    });

    this.onMessage("add_row", (client, message) => {  

        console.log("MESSAGE: 'add_row' recieved!");
        this.state.addRow();
        if(this.state.noSetsNoCards){
          this.broadcast('noSets_noCards', 'aint no dang sets or cards left');
          this.state.getGameResults();
        }
    });

    this.onMessage("start_game", (client, message) => {  

      console.log("MESSAGE:  'start_game' recieved! Game starting!");
        this.state.started=true;
    });

    this.onMessage("quit", (client, message) => {  
      console.log("MESSAGE:  'quit' recieved! Getting game result!");
      this.broadcast('player_quit', {playerId:client.sessionId});
      if(this.state.players.size>=2){
        console.log(client.sessionId, "left!");
        this.state.playerAbandoned(client.sessionId);
        this.state.players.delete(client.sessionId);
      }
      else{
        console.log('==================== Game over, player quit, and only one remaining');
        this.state.getGameResults();
      }  
    });

    this.onMessage("ready", (client, message) => {  

      console.log("MESSAGE: 'ready' recieved! Changing player to ready!");
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

      console.log("MESSAGE:  'not_ready' recieved! Changing player to rNOT eady!");
      this.state.players.get(client.sessionId).ready=false;
      this.state.allReady=false;

    });
  }

  onJoin (client, options) {
    // console.log(`User ${client.sessionId} Joined!`);
    console.log(`User ${options.username} Joined!`);
    console.log(`User logged in?: ${options.playerLoggedIn}`);
    this.playerLog[client.sessionId]={loggedIn:options.playerLoggedIn};
    console.log('Current Player Log: ', this.playerLog);
    this.metadata.players.push(client.sessionId);
    this.state.addPlayer(client.sessionId,options.username);
  }

  async onLeave (client, consented) {
    console.log(client.sessionId, "left!");
    client.send('player_clear',`client ${this.state.players[client.sessionId].username} left!`);

    if(this.state.started && !this.state.finished){
      this.broadcast('player_left', {playerId:client.sessionId});
      this.state.playerAbandoned(client.sessionId);
    }
    this.state.players.delete(client.sessionId);

    timeout=null;
  }

  async onDispose() {

    console.log('this.state.gameResult? : ', this.state.gameResult);
    // save game result at this point with backend api
    try{
      await Game.save(this.state.id,this.state.gameResult,this.state.mode);
      await Game.savePlayerData(this.state.id,this.state.scoreboard, this.playerLog);
    }
    catch(e){
      console.log('Error: ', e);
    }
    console.log("room", this.roomId, "disposing...");
  }
}
