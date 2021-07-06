const schema = require('@colyseus/schema');
const Schema = schema.Schema;
const ArraySchema = schema.ArraySchema;
const { Card } = require('./Card');
const MapSchema = schema.MapSchema;
const { CellState } = require('./CellState');

class BoardState extends Schema {

    constructor (cards) {
        super();
        this.grid= new MapSchema();
        this.maxRows=4;
        this.cols = new ArraySchema();
        this.cols.push("A", "B", "C");
        this.selectedCards= new MapSchema();
        this.makeGrid(cards);
        // this.printGrid();
    }

    makeGrid(cards){

        // console.log('Making grid with cards: ', cards);
        let cardIndex=0;
        let cardIds = Array.from(cards.keys());

        for(let i=0; i<this.maxRows; i++){

            for(let col of this.cols){
                const newCard = cards.get(cardIds[cardIndex]);
                // console.log('inside MAKEGRID -- newCard: ', newCard);
                const newCell = new CellState(newCard);
                this.grid.set(`${i}-${col}` , newCell);
                cardIndex++;
            }
        }
        console.log('this.grid: ', this.grid);
    }

    printGrid(){
        console.log('Printing Grid: ');
        // console.log(this.grid.entries());
        for(let key of this.grid.keys()){

            console.log( "cell: ", key , ' - ', this.grid.get(key));
            console.log( this.grid.get(key).card.color);
            console.log( this.grid.get(key).card.id);
        }
    }

    addRow(cards){
        // console.log('Adding another row...');

        let cardIndex=0;
        let cardIds = Object.keys(cards);
        for(let col of this.cols){

            this.grid[`4-${col}`]={
                selected: false,
                card: cards[cardIds[cardIndex]]
            };
            cardIndex++;
        }
        // console.log('Added row: ' );
        // console.log(this.grid['4-A']);
        // console.log(this.grid['4-B']);
        // console.log(this.grid['4-C']);
    }

    removeCards(coords){

        for(coord of coords){
            this.grid[coord] = undefined;
        }
    }

    fillEmptySlots(coords, cards){

        // console.log('Filling Empty Slots: ', coords);

        let coordIndex=0;
        let cardIds = Object.keys(cards);

        for(let cardId of cardIds){

            // allowing for the case of less cards to draw than slots available
            this.grid[coords[coordIndex]] = cards[cardId];
            coordIndex++;
            // console.log('Filled Slot: ', this.grid[coords[coordIndex]]);
            // console.log('Card: ', cards[cardId]);
        }
    }
    
    selectCard(coord){

        console.log("Selecting a card on the back end!");
        console.log('Current Grid: ', this.grid);
        const card = this.grid[coord].card;

        console.log(`Selecting card... ${coord}`);
        this.grid[coord].selected=true;
        this.selectedCards[card.id] = card;

        console.log(this.grid[coord] , ' has been selected!');
    }

    clearSelectedCards(coords){

        for(let coord of coords){
            this.grid[coord].selected=false;
        }
    }

    clearBoard(){

        // console.log('Clearing board...');
        // console.log('Say goodbye to board: ', this.grid);

        for(let cell of Object.keys(this.grid)){
            this.grid[cell] = undefined;
        }

        // console.log('Board Cleared! ');
        // console.log('Checkout the empty board: ', this.grid);
    }
    toJSON(){

        return {
            grid: this.grid,
            maxRows: this.maxRows,
            cols: this.cols, 
            selectedCards: this.selectedCards,
        }
    }
}
schema.defineTypes(BoardState, {
    grid: { map: CellState },
    maxRows:'number',
    cols: [ "string" ],
    selectedCards:{map: Card}
});

exports.BoardState = BoardState;