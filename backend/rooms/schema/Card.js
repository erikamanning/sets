const schema = require('@colyseus/schema');
const Schema = schema.Schema;

class Card extends Schema {

    constructor(color, shape, numShapes, fillLevel,id){
        super();
        this.color = color;
        this.shape = shape;
        this.numShapes = numShapes;
        this.fillLevel = fillLevel;
        this.id = id;
    }
    printDetails(){
        this.numShapes>1 
            ? console.log(`- CARD: ${this.numShapes} ${this.color} ${this.fillLevel} ${this.shape}s`)
            : console.log(`- CARD: ${this.numShapes} ${this.color} ${this.fillLevel} ${this.shape}`)
    }
}
schema.defineTypes(Card, {
    color: "string",
    shape: "string",
    numShapes: "number",
    fillLevel: "string",
    id: "string"
});

exports.Card = Card;