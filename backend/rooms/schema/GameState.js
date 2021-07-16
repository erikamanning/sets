const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const {BoardState} = require("./BoardState");
const { DeckState } = require('./DeckState');
const { Player } = require('./PlayerState');

class GameState extends Schema {    

    constructor(testState=false) {
        super();
        this.score = 0;
        this.players = new MapSchema();
        this.deck = new DeckState(["red","green","purple"], ["square","circle", "triangle"]);
        
        if(!testState)
            this.board = new BoardState(this.deck.drawCards(12));
        else
            this.board = new BoardState(this.deck.drawFromTopOfDeck(12));
    }

    addPlayer(username){
        console.log("added player: ", username);
        const newPlayerNumber = this.players.size+1;
        // console.log('typeof newPlayerNumber: ', typeof(newPlayerNumber));
        // const tfisthis = Player._context.types['4'];
        // console.log('PLAYER IS: ', tfisthis);
        const newPlayer = new Player(username,newPlayerNumber);
        newPlayer.printDetails();
        this.players.set(newPlayerNumber, newPlayer);
        // console.log('in ADDPLAYER: ', this.players);
    }

    printBoard(){

        for(let cell of Array.from(this.board.grid.keys())){

            console.log( "* CELL ", cell , ': ');
            this.board.grid.get(cell).card 
                ? this.board.grid.get(cell).card.printDetails()
                : null
        }
    }

    sayHello(){
      console.log("Hello from the Game State!");
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
        console.log('Checking if cards are a set...');

        for(let property of this.deck.cardProperties){
            let set = this.checkIndividualProperty(property,cards);
            if(!set)
                return false;
        }
        return true;
    }

    checkIndividualProperty(property,cards){

        const keys = Array.from(cards.keys());

        if(cards[keys[0]][property] === cards[keys[1]][property]){

            if(cards[keys[0]][property]!== cards[keys[2]][property])
                return false;
            else
                return true;
        }
        else{
            if(cards[keys[1]][property] === cards[keys[2]][property] || cards[keys[0]][property] === cards[keys[2]][property])
                return false;
            else
                return true;
        }
    }

    handleBadSet(){
        this.decreaseScore();
        this.board.deselectNonSet();
        this.board.clearSelectedCards();
    }

    handleGoodSet(coords){
        this.increaseScore();
        this.board.clearSet(coords);
        this.board.clearSelectedCards();

        // fill empty slots if necessary
        if(this.board.getActiveCardCount() <12){
            this.board.fillEmptySlots(coords,this.deck.drawCards(3));
        }
        else{
            // shift cells back
            console.log('12 cards, spread out too wide, need to shift board back');
            this.board.shiftGridCards();
        }
    }

    handleSelection(coord){

        // select card
        this.board.selectCard(coord);

        if(this.board.selectedCards.size ===3){

            // check match
            const isSet = this.checkSet(this.board.selectedCards);
            const coords = Array.from(this.board.selectedCards.keys());

            // handle results
            if(isSet)
                this.handleGoodSet(coords);
            else
                this.handleBadSet();
        }
    }
}
schema.defineTypes(GameState, {
  players: { map: Player },
  board: BoardState,
  deck: DeckState,
});

const newGame = new GameState();
newGame.addPlayer('erika');
newGame.players.forEach(player=>player.printDetails());

exports.GameState = GameState;