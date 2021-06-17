
const schema = require('@colyseus/schema');
const Schema = schema.Schema;

class Player extends Schema {
}
schema.defineTypes(Player, {
  x: "number",
  y: "number"
});