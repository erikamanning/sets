const schema = require('@colyseus/schema');
const { Card } = require('./Card');
const Schema = schema.Schema;

class Set extends Schema {

  constructor(cards){
    super();
    this.cards = cards;
  }

  printDetails(){
    console.log('Set Details ');
    console.log('====================');
    Array.from(this.cards.keys()).forEach(key=>this.cards.get(key).printDetails());
  }
}

schema.defineTypes(Set, {
  cards: {map: Card}
});

exports.Set = Set;