const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const {BoardState} = require("./BoardState");
const { DeckState } = require('./DeckState');
const { Player } = require('./PlayerState');

class GameState extends Schema {

    players={};
    deck = new DeckState(["red","green","purple"], ["square","circle", "triangle"]);
    board = new BoardState(this.deck.drawCards(12));

    greeting = "welcome to the game b-word";
    constructor () {
        super();
        // this.players = new MapSchema();
    }

    sayHello(){
      console.log("Hello from the Game State!");
    }

    addPlayer(username){
      this.players[username] = new Player(username);
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
schema.defineTypes(GameState, {
  greeting: "string",
  board: "BoardState",
  deck: "DeckState",
  players: "object"

});

const newGame = new GameState();

newGame.board.addRow(newGame.deck.drawCards(3));
newGame.board.selectCard('1-B');
newGame.board.clearBoard();

exports.GameState = GameState;