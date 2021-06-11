const { v4: uuidv4 } = require('uuid');


class Deck{
    constructor(colors=[], shapes=[]){
        this.colors = colors;
        this.shapes = shapes;
        this.maxShapes = 3;
        this.fillLevels = ["empty", "striped", "solid"];
        this.numCards = 81;
        this.cardProperties = ['color', 'shape', 'numShapes', 'fillLevel'];
        this.cards = {};
        this.createDeck();
    }

    createDeck(){
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
}

class Card{
    constructor(color, shape, numShapes, fillLevel,id){
        this.color = color;
        this.shape = shape;
        this.numShapes = numShapes;
        this.fillLevel = fillLevel;
        this.id = id;
    }

}

module.exports =  {Deck, Card};