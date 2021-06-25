const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;

class Card extends Schema {

    color;
    shape;
    numShapes;
    fillLevel;
    id;

    constructor(color, shape, numShapes, fillLevel,id){
        super();
        this.color = color;
        this.shape = shape;
        this.numShapes = numShapes;
        this.fillLevel = fillLevel;
        this.id = id;
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