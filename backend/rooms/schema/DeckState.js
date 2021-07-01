const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;
const { v4: uuidv4 } = require('uuid');
const { Card } = require('./Card');

class DeckState extends Schema {

    constructor (colors,shapes) {
        super();

        this.colors = new ArraySchema();
        this.shapes = new ArraySchema();
        this.colors.push(...colors);
        this.shapes.push(...shapes);
        this.maxShapes = 3;
        this.fillLevels = new ArraySchema();
        this.fillLevels.push("empty", "striped", "solid");
        this.numCards = 81;
        this.cardProperties = new ArraySchema();
        this.cardProperties.push('color', 'shape', 'numShapes', 'fillLevel');
        this.cards = {};
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
  colors: ["string"],
  shapes: ["string"],
  maxShapes: "number",
  fillLevels: ["string"],
  numCards: "number",
  cardProperties: ["string"],
  cards: "object"
});

exports.DeckState = DeckState;