const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const { v4: uuidv4 } = require('uuid');
const { Card } = require('./Card');

class DeckState extends Schema {

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

    printDeck(){
        let i=1;
        for(let card of Object.keys(this.cards)){
            // console.log(`Card: ${i}: `, card);
            i++;
        }
    }

    createDeck(){
        // console.log("CREATING DECK IN DECK STATE....");
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
    
    drawRandomCard(){
        const cardIndex = Math.floor(Math.random() * ((Object.keys(this.cards).length-1) - 0 + 1) + 0);
        const cardId = Object.keys(this.cards)[cardIndex];
        const card = this.cards[cardId];
        delete this.cards[cardId];
        return card;
    }

    drawCards(numCards){
        const cards = {};
        for(let i=0; i<numCards; i++){
            let randomCard = this.drawRandomCard();
            cards[randomCard.id] = randomCard;
        }
        return cards;
    }

    toJSON(){

        return {
            colors: this.colors,
            shapes: this.shapes,
            maxShapes: this.maxShapes,
            fillLevels: this.fillLevels,
            numCards: this.numCards,
            cardProperties: this.cardProperties,
            cards: this.cards,
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