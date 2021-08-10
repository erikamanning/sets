const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const MapSchema = schema.MapSchema;
const {BoardState} = require("./BoardState");
const {Set} = require("./SetState");
const { DeckState } = require('./DeckState');
const { Player } = require('./PlayerState');
const colyseus = require('colyseus');

class GameState extends Schema {    

    constructor(testState=false, mode) {
        super();
        this.mode = mode;
        this.turn='any';
        this.allReady=false;
        this.started=false;
        this.finished=false;
        this.players = new MapSchema();
        this.noSetsNoCards = false;
        this.playerLeft = false;

        if(!testState){
            this.deck = new DeckState(["red","green","purple"], ["square","circle", "triangle"]);
            this.board = new BoardState(this.deck.drawCards(12));
        }
        else{
            this.deck = new DeckState(["red","green"], ["square","circle", "triangle"]);
            this.board = new BoardState(this.deck.drawFromTopOfDeck(12));
        }

        this.checkBoardForSets();
    }

    addPlayer(sessionId, username){
        const newPlayerNumber = this.players.size+1;
        const newPlayer = new Player(username,newPlayerNumber);
        this.players.set(sessionId, newPlayer);
    }

    removePlayer(sessionId){
        this.players.delete(sessionId);
    }


    getMultiplayerResults(){

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
        }
        else{
            const {topScore,topScoringPlayer} =  this.getTopScore();
            const result = this.checkForTie(topScore,topScoringPlayer);;
            this.gameResult =result.result;
            this.winner = result.winner;
        }
        this.finished=true;
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
            }
        }
        else{
            result={
                result:'win',
                winner:topScoringPlayer,
                score:topScoringPlayer.score,
            }
        }
        return result;
    }

    printBoard(){
        for(let cell of Array.from(this.board.grid.keys())){
            console.log( "* CELL ", cell , ': ');
            this.board.grid.get(cell).card 
                ? this.board.grid.get(cell).card.printDetails(): null
        }
    }
    checkAllReady(){
        
        const playerIds = Array.from(this.players.keys());

        for(let playerId of playerIds){
            if(!this.players.get(playerId).ready)
                return false;
        }
        return true;
    }

    increaseScore(sessionId){
      console.log('increasing score...')
      this.players.get(sessionId).score+=1;
    }

    decreaseScore(sessionId){
        console.log('decreasing score...')
        this.players.get(sessionId).score-=1;
    }

    addRow(){
        this.board.addRow(this.testState ? this.deck.drawFromTopOfDeck(3) : this.deck.drawCards(3));
        this.checkBoardForSets();
    }


    checkBoardForSets(){

        const cards = this.board.getGridCards();
        const cardIds = Array.from(cards.keys());
        let currentSetCount = 0;
        const currentSets = new Map();
        for(let i=0; i<cards.size; i++){
            for(let j=i+1; j<cards.size; j++){
                for(let k=j+1; k<cards.size; k++){
    
                    const newSelection = new Map();
                    newSelection.set(cardIds[i], cards.get(cardIds[i]));
                    newSelection.set(cardIds[j], cards.get(cardIds[j]));
                    newSelection.set(cardIds[k], cards.get(cardIds[k]));
    
                    if(this.checkSet(newSelection)){
                        const newSet = new Set(newSelection);
                        currentSets.set(currentSetCount,newSet);
                        currentSetCount++;
                    }
                }
            }
        }
        console.log('set count: ', currentSetCount);

        this.currentSetCount = currentSetCount;
        this.currentSets = currentSets;
        Array.from(this.currentSets.keys()).forEach(key=>this.currentSets.get(key).printDetails());

        if(this.currentSetCount === 0 && this.deck.cards.size ===0){
            this.noSetsNoCards=true;
        }
    }

    checkSet(cards){
        // console.log('Checking if cards are a set...');
        // Array.from(cards.keys).forEach(key=>cards[key].printDetails);

        if(cards.size <3){
            console.log('cards less than size 3')
            return false;
        } 

        for(let property of this.deck.cardProperties){
            let set = this.checkIndividualProperty(property,cards);
            if(!set){
                // Array.from(cards.keys()).forEach(key=>cards.get(key).printDetails());
                // console.log('XXXX are NOT a set!');
                return false;
            }
        }
        // Array.from(cards.keys()).forEach(key=>cards.get(key).printDetails());
        // console.log('****** are a set!');
        return true;
    }

    checkIndividualProperty(property,cards){

        const keys = Array.from(cards.keys());

        if(cards.get(keys[0])[property] === cards.get(keys[1])[property]){

            if(cards.get(keys[0])[property]!== cards.get(keys[2])[property])
                return false;
            else
                return true;
        }
        else{
            if(cards.get(keys[1])[property] === cards.get(keys[2])[property] || cards.get(keys[0])[property] === cards.get(keys[2])[property])
                return false;
            else
                return true;
        }
    }

    handleBadSet(playerSessionId){
        this.decreaseScore(playerSessionId);
        this.board.deselectNonSet();
        this.board.clearSelectedCards();
        // this.board.showGridSelectionsStatus();
    }

    handleGoodSet(playerSessionId, coords){
        this.increaseScore(playerSessionId);
        this.board.clearSet(coords);
        this.board.clearSelectedCards();

        // fill empty slots if necessary
        if(this.board.getGridCardCount() <12 && this.deck.cards.size>0){
            this.board.fillEmptySlots(coords,this.testState ? this.deck.drawFromTopOfDeck(3) : this.deck.drawCards(3));
        }
        else{
            // shift cells back
            console.log('12 cards, spread out too wide, need to shift board back');
            this.board.shiftGridCards();
        }
    }
    checkSelection(sessionId){
        console.log('checking set!!!');

        // check match
        const isSet = this.checkSet(this.board.selectedCards);
        const coords = Array.from(this.board.selectedCards.keys());

        // handle results
        if(isSet)
            this.handleGoodSet(sessionId,coords);
        else
            this.handleBadSet(sessionId);

        this.checkBoardForSets();
    }

}
schema.defineTypes(GameState, {
  mode: "string",
  turn:"string",
  noSetsNoCards: 'boolean',
  playerLeft: 'boolean',
  currentSetCount: "number",
  currentSets: {map: Set},
  allReady:"boolean",
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