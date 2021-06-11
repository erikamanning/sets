const { Deck } = require("./Deck.js");

class SetsGame{

    constructor(){
        this.player = {
            player:'player1',
            score: 0
        };
        this.deck = new Deck(["red","green","purple"], ["square","circle", "triangle"]);   
        this.board = this.deck.drawCards(12);
    }

    increaseScore(){
        console.log('increasing score...')
        this.player.score+=1;
    }
    decreaseScore(){
        console.log('decreasing score...')
        this.player.score-=1;
    }

    getScore(){
        console.log('getting score: ', this.player.score);
        return this.player.score;
    }

    checkSet(cards){
        
        for(let property of this.deck.cardProperties){
            // console.log("Property: ", property);
            let set = this.checkIndividualProperty(property,cards);
            if(!set){
                this.decreaseScore();
                return false;
            }
        }
        this.increaseScore();
        // clear cards
        this.clearCardsFromBoard(Object.keys(cards));

        if(Object.keys(this.board).length <12)
            this.addRowToBoard();

        return true;
    }

    clearCardsFromBoard(cardIds){

        for(let id of cardIds){

            delete this.board[id];
        }
    }

    addRowToBoard(){

        this.board = {
            ...this.board,
            ...this.deck.drawCards(3)
        }
    }
    
    checkIndividualProperty(property,cards){

        const keys = Object.keys(cards);

        if(cards[keys[0]][property] === cards[keys[1]][property]){

            if(cards[keys[0]][property]!== cards[keys[2]][property])
                return false;
            
            else
                return true;
        }
        else{
            if(cards[keys[1]][property] === cards[keys[2]][property] || cards[keys[0]][property] === cards[keys[2]][property]){
                return false;
            }
            else{
                return true;
            }
        }
    }
}

module.exports = {SetsGame};