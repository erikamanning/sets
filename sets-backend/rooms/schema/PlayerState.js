const schema = require('@colyseus/schema');
const Schema = schema.Schema;

class Player extends Schema {

  constructor(username,playerNumber){
    super();
    this.username=username;
    this.active = true;
    this.playerNumber=playerNumber;
    this.score=0;
    this.ready=false;
    this.abandoned = false;
  }

  printDetails(){
    console.log('Player Details ');
    console.log('====================');
    console.log(`Player #: ${this.playerNumber} `);
    console.log('username: ', this.username);
    console.log('score: ', this.score);
    console.log('abandoned: ', this.abandoned);
  }
}

schema.defineTypes(Player, {
  username: "string",
  active: "boolean",
  playerNumber: "number",
  score: "number",
  ready:"boolean",
  abandoned:'boolean',
  playerResult: 'string'
});

exports.Player = Player;