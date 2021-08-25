const { Card } = require('./Card');
const {BoardState} = require("./BoardState");
const { DeckState } = require('./DeckState');
const { GameState } = require('./GameState');

class GameTest{

    constructor(){

        this.game = new GameState(true);
        this.game.addPlayer('testId', 'testuser');
    }
    testMatch(){
        console.log('Testing GOOD match...')
        const beforeTestCount = this.game.board.getActiveCardCount();
        this.game.handleSelection('testId','0-A');
        this.game.handleSelection('testId','0-B');
        this.game.handleSelection('testId','0-C');
        const afterTestCount = this.game.board.getActiveCardCount();
        console.log('# of cards on grid BEFORE good match: ',beforeTestCount);
        console.log('# of cards on grid AFTER good match: ', afterTestCount);
        // this.printGridResults('testMatch');

    }
    
    testNotMatch(){
        console.log('Testing BAD match...')
        const beforeTestCount = this.game.board.getActiveCardCount();
        this.game.handleSelection('testId','0-A');
        this.game.handleSelection('testId','0-B');
        this.game.handleSelection('testId','1-A');
        const afterTestCount = this.game.board.getActiveCardCount();
        console.log('# of cards on grid BEFORE bad match: ',beforeTestCount);
        console.log('# of cards on grid after bad match: ', afterTestCount);        // this.game.board.showGridSelectionsStatus();
    }

    testAddCardsToGrid(){
        console.log('Testing testAddCardsToGrid match...');
        this.game.board.addRow(this.game.deck.drawFromTopOfDeck(3));
        this.printGridResults('testAddCardsToGrid');
    }

    testShiftAfterMatch(){
        // this.printGridResults('START TEST');
        this.game.board.addRow(this.game.deck.drawFromTopOfDeck(3));
        this.testMatch();
        this.printGridResults('testShiftAfterMatch');
    }

    testPlayerJoin(){
        this.game.addPlayer('gandalf');
        this.game.addPlayer('ned');
        this.game.addPlayer('harry');
        this.game.addPlayer('boromir');
        this.game.addPlayer('legolas');
        this.game.addPlayer('ron');
        this.game.players.forEach(player=> player.printDetails());

    }

    printGridResults(action){
        console.log(`Grid after ${action}: `);
        this.game.board.printGrid();
    }


}


const testGame = new GameTest();


module.exports= {testGame};

/*

Board:

// first 12

0-A -- CARD: 1 red empty square
0-B -- CARD: 1 red striped square
0-C -- CARD: 1 red solid square
1-A -- CARD: 2 red empty squares
1-B -- CARD: 2 red striped squares
1-C -- CARD: 2 red solid squares
2-A -- CARD: 3 red empty squares
2-B -- CARD: 3 red striped squares
2-C -- CARD: 3 red solid squares
3-A -- CARD: 1 red empty circle
3-B -- CARD: 1 red striped circle
3-C -- CARD: 1 red solid circle

// next 3

4-A -- CARD: 2 red empty circle
4-B -- CARD: 2 red striped circle
4-C -- CARD: 2 red solid circle

*/


// DECK

/*

CARD: 1 red empty square
CARD: 1 red striped square
CARD: 1 red solid square
CARD: 2 red empty squares
CARD: 2 red striped squares
CARD: 2 red solid squares
CARD: 3 red empty squares
CARD: 3 red striped squares
CARD: 3 red solid squares
CARD: 1 red empty circle
CARD: 1 red striped circle
CARD: 1 red solid circle
CARD: 2 red empty circles
CARD: 2 red striped circles
CARD: 2 red solid circles
CARD: 3 red empty circles
CARD: 3 red striped circles
CARD: 3 red solid circles
CARD: 1 red empty triangle
CARD: 1 red striped triangle
CARD: 1 red solid triangle
CARD: 2 red empty triangles
CARD: 2 red striped triangles
CARD: 2 red solid triangles
CARD: 3 red empty triangles
CARD: 3 red striped triangles
CARD: 3 red solid triangles
CARD: 1 green empty square
CARD: 1 green striped square
CARD: 1 green solid square
CARD: 2 green empty squares
CARD: 2 green striped squares
CARD: 2 green solid squares
CARD: 3 green empty squares
CARD: 3 green striped squares
CARD: 3 green solid squares
CARD: 1 green empty circle
CARD: 1 green striped circle
CARD: 1 green solid circle
CARD: 2 green empty circles
CARD: 2 green striped circles
CARD: 2 green solid circles
CARD: 3 green empty circles
CARD: 3 green striped circles
CARD: 3 green solid circles
CARD: 1 green empty triangle
CARD: 1 green striped triangle
CARD: 1 green solid triangle
CARD: 2 green empty triangles
CARD: 2 green striped triangles
CARD: 2 green solid triangles
CARD: 3 green empty triangles
CARD: 3 green striped triangles
CARD: 3 green solid triangles
CARD: 1 purple empty square
CARD: 1 purple striped square
CARD: 1 purple solid square
CARD: 2 purple empty squares
CARD: 2 purple striped squares
CARD: 2 purple solid squares
CARD: 3 purple empty squares
CARD: 3 purple striped squares
CARD: 3 purple solid squares
CARD: 1 purple empty circle
CARD: 1 purple striped circle
CARD: 1 purple solid circle
CARD: 2 purple empty circles
CARD: 2 purple striped circles
CARD: 2 purple solid circles
CARD: 3 purple empty circles
CARD: 3 purple striped circles
CARD: 3 purple solid circles
CARD: 1 purple empty triangle
CARD: 1 purple striped triangle
CARD: 1 purple solid triangle
CARD: 2 purple empty triangles
CARD: 2 purple striped triangles
CARD: 2 purple solid triangles
CARD: 3 purple empty triangles
CARD: 3 purple striped triangles
CARD: 3 purple solid triangles


*/