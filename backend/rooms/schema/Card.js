const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;

class Card extends Schema {

    constructor(color, shape, numShapes, fillLevel,id){
        super();
        this.color = color;
        this.shape = shape;
        this.numShapes = numShapes;
        this.fillLevel = fillLevel;
        this.id = id;
    }
    toJSON(){

        return {
            color: this.color,
            shape: this.shape,
            numShapes: this.numShapes,
            fillLevel: this.fillLevel,
            id: this.id
        }
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