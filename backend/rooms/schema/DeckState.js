const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;
const { v4: uuidv4 } = require('uuid');
const { Card } = require('./Card');
const MapSchema = schema.MapSchema;

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
        this.cards = new MapSchema();
        this.createDeck();
        // this.printDeck();

    }

    printDeck(){
        // console.log('Printing deck...');
        let i=1;

        for(let card of this.cards.keys()){
            this.cards.get(card).printDetails();
        }
    }

    createDeck(){
        // console.log("CREATING DECK IN DECK STATE....");
        for(let color of this.colors){
            for(let shape of this.shapes){
                for(let numShapes=1; numShapes<this.maxShapes+1; numShapes++){
                    for(let fillLevel of this.fillLevels){
                        const cardId = uuidv4();
                        const newCard = new Card(color, shape, numShapes, fillLevel, cardId);
                        this.cards.set(cardId, newCard);
                    }
                }
            }
        }
    }
    
    drawRandomCard(){
        // console.log('Drawing random card...');
        const cardIds = Array.from(this.cards.keys());
        const cardIndex = Math.floor(Math.random() * ((cardIds.length-1) - 0 + 1) + 0);
        const cardId = cardIds[cardIndex];
        // console.log('cardId: ', cardId);
        const card = this.cards.get(cardId);
        // console.log('Random card: ', card);
        this.cards.delete(cardId);
        return card;
    }

    drawFromTopOfDeck(numCards){
        const cardIds = Array.from(this.cards.keys());
        // console.log('cardIds: ',cardIds);

        let cardIdIndex = 0;
        // console.log('cards: ',this.cards);
        const cards = new MapSchema();
        for(let i=0; i<numCards; i++){
            let card = this.cards.get(cardIds[cardIdIndex]);
            this.cards.delete(cardIds[cardIdIndex]);
            cards.set(card.id, card);
            cardIdIndex++;
        }

        // console.log('Cards: ');
        // console.log(cards.forEach(card=>card.printDetails()));
        return cards;
    }

    drawCards(numCards){
        // console.log(`Drawing ${numCards} cards...`);
        const cards = new MapSchema();
        for(let i=0; i<numCards; i++){
            let randomCard = this.drawRandomCard();
            cards.set(randomCard.id, randomCard);
        }

        // console.log('Cards: ', cards);
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
  colors: ["string"],
  shapes: ["string"],
  maxShapes: "number",
  fillLevels: ["string"],
  numCards: "number",
  cardProperties: ["string"],
  cards: {map: Card}
});

// const newDeck = new DeckState(["red","green","purple"], ["square","circle", "triangle"]);
// newDeck.drawCards(12);

exports.DeckState = DeckState;