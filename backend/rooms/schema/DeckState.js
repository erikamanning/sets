const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const { v4: uuidv4 } = require('uuid');
const { Card } = require('./Card');

class DeckState extends Schema {

    greeting = "this is the DECK";
    colors;
    shapes;
    maxShapes = 3;
    fillLevels = ["empty", "striped", "solid"];
    numCards = 81;
    cardProperties = ['color', 'shape', 'numShapes', 'fillLevel'];
    cards = {};

    constructor (colors,shapes) {
        super();

        this.colors = colors;
        this.shapes = shapes;
        this.createDeck();
        this.printDeck();

    }
    
    selectPiece(){
        console.log("Selecting a piece on the back end!");
    }

    printDeck(){
        let i=1;
        for(let card of Object.keys(this.cards)){
            console.log(`Card: ${i}: `, card);
            i++;
        }
    }

    createDeck(){
        console.log("CREATING DECK IN DECK STATE....");
        for(let color of this.colors){
            for(let shape of this.shapes){
                for(let numShapes=1; numShapes<this.maxShapes+1; numShapes++){
                    for(let fillLevel of this.fillLevels){
                        const cardId = uuidv4();
                        this.cards[cardId] = new Card(color, shape, numShapes, fillLevel, cardId);
                    }
                }
            }
        }
    }
}
schema.defineTypes(DeckState, {
  greeting: "string",
  colors: "object",
  shapes: "object",
  maxShapes: "number",
  fillLevels: "object",
  numCards: "number",
  cardProperties: "object",
  cards: "object"
});

exports.DeckState = DeckState;