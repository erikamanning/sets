const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const {Player} = require("./PlayerState");

class GameState extends Schema {

    greeting = "welcome to the game b-word";
    constructor () {
        super();

        // this.players = new MapSchema();
    }
    sayHello(){
      console.log("Hello from the Game State!");
    }
}
schema.defineTypes(GameState, {
  greeting: "string"
});

exports.GameState = GameState;