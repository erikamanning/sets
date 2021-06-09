class Deck{
    constructor(colors=[], shapes=[]){
        this.colors = colors;
        this.shapes = shapes;
        this.maxShapes = 3;
        this.fillLevels = ["empty", "striped", "solid"];
        this.numCards = 81;
        this.cards = [];
        this.createDeck();
    }
    shuffle(){
        console.log('Shuffling deck...')
    }
    createDeck(){
        console.log('creating deck from provided data...');
        for(let color of this.colors){
            for(let shape of this.shapes){
                for(let numShapes=1; numShapes<this.maxShapes+1; numShapes++){
                    this.cards.push(new Card(color, shape, numShapes, "empty"));
                    this.cards.push(new Card(color, shape, numShapes, "striped"));
                    this.cards.push(new Card(color, shape, numShapes, "solid"));
                }
            }
        }
    }
    printDeck(){
        console.log('Deck: ');
        let count =0;
        for(let card of this.cards){
            count++;
            console.log(`Card ${count}` , card.color, card.shape, card.numShapes, card.fillLevel );
        }
    }
    drawRandomCard(){

        const cardIndex = Math.floor(Math.random() * ((this.cards.length-1) - 0 + 1) + 0);
        const card = this.cards.splice(cardIndex,1);
        console.log("Card: ", card);
        return card[0];
    }

    getCards(numCards){
        const cards = [];
        for(let i=0; i<numCards; i++){
            cards.push(this.drawRandomCard());
        }
        return cards;
    }
}

class Card{
    constructor(color, shape, numShapes, fillLevel){
        this.color = color;
        this.shape = shape;
        this.numShapes = numShapes;
        this.fillLevel = fillLevel;
    }
}

export {Deck, Card};