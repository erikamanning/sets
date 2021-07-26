const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const {BoardState} = require("./BoardState");
const { DeckState } = require('./DeckState');
const { Player } = require('./PlayerState');

class GameState extends Schema {    

    constructor(testState=false, mode) {
        super();
        console.log('``````````````````````')
        console.log("MODE: ", mode);
        this.mode = mode;
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
        // console.log("added player: ", username);
        const newPlayerNumber = this.players.size+1;
        const newPlayer = new Player(username,newPlayerNumber);
        // newPlayer.printDetails();
        this.players.set(sessionId, newPlayer);
        // console.log('Players: ', this.players.forEach(player=>player.printDetails()))
    }

    removePlayer(sessionId){
        this.players.delete(sessionId);
    }

    getTopScore(){

        let topScore=0;
        let topScoringPlayer;

        for(let key of this.players.keys()){
            if(topScore<=this.players[key].score){
                topScore=this.players[key].score;
                topScoringPlayer=this.players[key];
            }
        }
        return {topScore,topScoringPlayer};
    }


    checkForTie(topScore,topScoringPlayer){
        let topScoringPlayers=0;
        let result;

        console.log('topScoringPlayer: ', topScoringPlayer.username);

        for(let key of this.players.keys()){
            if(topScore==this.players[key].score){
                topScoringPlayers++;
            }
        }
        if(topScoringPlayers>1){
            result={
                result: 'tie',
                winner:'none'
            }
        }
        else{
            result={
                result:'win',
                winner:topScoringPlayer.username,
                score:topScoringPlayer.score,
            }
        }
        return result;
    }

    getGameResult(){

        const playerKeys = Array.from(this.players.keys());
        const indexZero = 0;

        if(this.mode==="singleplayer"){
            const score = this.players[playerKeys[indexZero]].score;
            if(score/27===1)
                this.perfectGame=true;
            else
                this.perfectGame=false;
            
            this.topScore=`${score}/27`;
            this.finished=true;
        }
        else{
            const {topScore,topScoringPlayer} =  this.getTopScore();
            const result = this.checkForTie(topScore,topScoringPlayer);;
            this.gameResult =result.result;
            this.winner = result.winner;
            this.finished=true;
        }
    }
    

    printBoard(){

        for(let cell of Array.from(this.board.grid.keys())){

            console.log( "* CELL ", cell , ': ');
            this.board.grid.get(cell).card 
                ? this.board.grid.get(cell).card.printDetails()
                : null
        }
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
        this.board.showGridSelectionsStatus();
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
  mode: "string",
  topScore: "string",
  perfectGame: "boolean",
  started: "boolean",
  finished: "boolean",
  gameResult: 'string',
  winner: Player,
  players: { map: Player },
  board: BoardState,
  deck: DeckState,
});

// const newGame = new GameState();
// newGame.addPlayer('1','erika');
// newGame.addPlayer('2','alex');
// newGame.addPlayer('3','austin');

// newGame.increaseScore('1');
// newGame.increaseScore('1');
// newGame.increaseScore('1');

// newGame.increaseScore('2');
// newGame.increaseScore('2');
// newGame.increaseScore('2');

// newGame.increaseScore('3');
// newGame.players.forEach(player=>player.printDetails());


// const result = newGame.getGameResult();

// console.log('Result: ', result);

exports.GameState = GameState;