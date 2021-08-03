const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const { Card } = require('./Card');

class CellState extends Schema {

    constructor (id, card) {
        super();
        this.id = id
        if(card)
            this.card=card;

        this.selected=false;
    }

    printDetails(){
        console.log(`Cell ${this.id}: `);
        if(this.card)
            this.card.printDetails();
        
        else
            console.log('No Card Yet');
        console.log('-- selected: ', this.selected);
    }

    toJSON(){

        return {
            card:this.card,
            selected:this.selected
        }
    }
}
schema.defineTypes(CellState, {
    card: Card,
    selected:"boolean",
    id: 'string'
});

// const newCard = new Card('orange', 'heart', 25, 'solid', 'testId');
// const newCellState = new CellState(newCard);

exports.CellState = CellState;