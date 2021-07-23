const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const {BoardState} = require("./BoardState");
const { DeckState } = require('./DeckState');
const { Player } = require('./PlayerState');

class GameState extends Schema {    

    constructor(testState=false) {
        super();
        this.started=false;
        this.finished=false;
        this.players = new MapSchema();
        this.deck = new DeckState(["red","green","purple"], ["square","circle", "triangle"]);
        
        if(!testState)
            this.board = new BoardState(this.deck.drawCards(12));
        else
            this.board = new BoardState(this.deck.drawFromTopOfDeck(12));
    }

    addPlayer(sessionId, username){
        console.log("added player: ", username);
        const newPlayerNumber = this.players.size+1;
        const newPlayer = new Player(username,newPlayerNumber);
        // newPlayer.printDetails();
        this.players.set(sessionId, newPlayer);
        // console.log('Players: ', this.players.forEach(player=>player.printDetails()))
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

    increaseScore(sessionId){
      console.log('increasing score...')
      this.players.get(sessionId).score+=1;
    }

    decreaseScore(sessionId){
        console.log('decreasing score...')
        this.players.get(sessionId).score-=1;
    }

    getScore(){
        console.log('getting score: ');
        // return this.score;
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

    handleBadSet(playerSessionId){
        this.decreaseScore(playerSessionId);
        this.board.deselectNonSet();
        this.board.clearSelectedCards();
    }

    handleGoodSet(playerSessionId, coords){
        this.increaseScore(playerSessionId);
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

    handleSelection(sessionId, coord){

        console.log('session: ', sessionId, ` ${this.players.get(sessionId).username} is selecting a card`);

        // select card
        this.board.selectCard(coord);

        if(this.board.selectedCards.size ===3){

            // check match
            const isSet = this.checkSet(this.board.selectedCards);
            const coords = Array.from(this.board.selectedCards.keys());

            // handle results
            if(isSet)
                this.handleGoodSet(sessionId,coords);
            else
                this.handleBadSet(sessionId);
        }
    }
}
schema.defineTypes(GameState, {
  started: "boolean",
  finished: "boolean",
  players: { map: Player },
  board: BoardState,
  deck: DeckState,
});

// const newGame = new GameState();
// newGame.addPlayer('erika');
// newGame.players.forEach(player=>player.printDetails());

exports.GameState = GameState;