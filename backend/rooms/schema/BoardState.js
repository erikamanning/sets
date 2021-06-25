const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;

class BoardState extends Schema {

    greeting = "this is the BOARD";
    constructor () {
        super();

        // this.players = new MapSchema();
    }
    selectPiece(){
        console.log("Selecting a piece on the back end!");
    }
}
schema.defineTypes(BoardState, {
  greeting: "string"
});

exports.BoardState = BoardState;