const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;

class Player extends Schema {
}
schema.defineTypes(Player, {
  username: "string",
  score: "number"
});

class MyState extends Schema {
    constructor () {
        super();

        this.players = new MapSchema();
    }
}
schema.defineTypes(MyState, {
  players: { map: Player }
});