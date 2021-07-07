const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const {BoardState} = require("./BoardState");
const { DeckState } = require('./DeckState');
const { Player } = require('./PlayerState');

class GameState extends Schema {    

    constructor () {
        super();
        this.score = 0;
        // this.players = new MapSchema();
        this.deck = new DeckState(["red","green","purple"], ["square","circle", "triangle"]);
        this.board = new BoardState(this.deck.drawCards(12));
    }

    printBoard(){

        for(let cell of Object.keys(this.board.grid)){

            console.log( "cell: ", cell , ' - ', this.board.grid[cell]);
        }
    }

    sayHello(){
      console.log("Hello from the Game State!");
    }

    addPlayer(username){
      this.players[username] = new Player(username);
    }

    increaseScore(){
      console.log('increasing score...')
      this.score+=1;
    }

    decreaseScore(){
        console.log('decreasing score...')
        this.score-=1;
    }

    getScore(){
        console.log('getting score: ', this.score);
        return this.score;
    }

    checkSet(cards){
        
        const coords = Array.from(cards.keys());

        for(let property of this.deck.cardProperties){
            // console.log("Property: ", property);
            let set = this.checkIndividualProperty(property,cards);
            if(!set){
                this.decreaseScore();
                this.board.deselectNonSet();
                return false;
            }
        }
        this.increaseScore();
        this.board.clearSet(coords);

        // clear cards
        // this.clearCardsFromBoard(cards);
        // this.clearCardsFromBoard(Object.keys(cards));

        if(this.board.size <12)
            // this.addRowToBoard();
            console.log('ADDING NEW ROW TO BOARD');

        return true;
    }

    checkIndividualProperty(property,cards){

        console.log(`typeof(cards): `, typeof(cards));
        console.log(`cards: `, cards);
        const keys = Array.from(cards.keys());
        console.log('0000000000000000000000000000');
        console.log(`keys: `, keys);

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
    handleSelection(coord){
        this.board.selectCard(coord);
        console.log('*************************');
        // console.log('in HANDLEsELECTION, currently selected cards: ',arrSelected.length);
        if(this.board.selectedCards.size ===3){

            // check match
            console.log('Checking match...');
            this.checkSet(this.board.selectedCards);

            // clear selection
            this.board.clearSelectedCards();
        }
    }
}
schema.defineTypes(GameState, {
  board: BoardState,
  deck: DeckState,
});

const newGame = new GameState();

// newGame.board.addRow(newGame.deck.drawCards(3));
// newGame.board.selectCard('1-B');
// newGame.board.clearBoard();

exports.GameState = GameState;