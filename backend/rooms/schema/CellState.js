const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const { Card } = require('./Card');

class CellState extends Schema {

    constructor (card) {
        super();
        this.card=card;
        this.selected=false;
    }

    toJSON(){

        return {

        }
    }
}
schema.defineTypes(CellState, {
    card: Card,
    selected:"boolean"
});

// const newCard = new Card('orange', 'heart', 25, 'solid', 'testId');
// const newCellState = new CellState(newCard);

exports.CellState = CellState;