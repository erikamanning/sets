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

    // incoorporate this later
    addCell(cellId, card ){
        console.log('Adding cell to grid...');
        const newCell= card ? new CellState(cellId,newCard) : new CellState(cellId);
        this.grid.set(cellId , newCell);
    }

    makeGrid(cards){

        // console.log('Making grid with cards: ', cards);
        let cardIndex=0;
        let cardIds = Array.from(cards.keys());

        for(let i=0; i<=this.maxRows; i++){

            for(let col of this.cols){
                if(cardIds[cardIndex]){
                    const newCard = cards.get(cardIds[cardIndex]);
                    // console.log('inside MAKEGRID -- newCard: ', newCard);
                    const newCell = new CellState(`${i}-${col}`,newCard);
                    this.grid.set(`${i}-${col}` , newCell);
                }
                else{
                    this.grid.set(`${i}-${col}` , new CellState(`${i}-${col}`) );
                }
                cardIndex++;
            }
        }
    }

    printGrid(){
        console.log('Printing Grid: ');
        // console.log(this.grid.entries());
        for(let key of this.grid.keys()){

            console.log( "cell: ", key);
            if(this.grid.get(key).card){
                this.grid.get(key).card.printDetails();
                console.log('selected: ', this.grid.get(key).selected);
            }
        }
    }

    addRow(cards){

        let cardIndices = Array.from(cards.keys());
        let cardIndex = 0;

        for(let col of this.cols){
            let gridIndex = `4-${col}`;
            let newCell = new CellState(gridIndex,cards.get(cardIndices[cardIndex]));
            this.grid.set(gridIndex,newCell);
            cardIndex++;
        }        
    }

    getGridCardCount(){

        let count = 0;
        let cells = Array.from(this.grid.keys())

        for(let cell of cells){
            if(this.grid.get(cell).card){
                count++;
            }
        }
        return count;
    }

    getGridCards(){

        const gridIds = Array.from(this.grid.keys());
        const cards = new Map();

        for(let gridId of gridIds){
            if(this.grid.get(gridId).card)
                cards.set(this.grid.get(gridId).card.id,this.grid.get(gridId).card);
        }
        return cards;
    }

    shiftGridCards(){

        // get all cells with cards into array
        const currentCards = this.getGridCards();

        // clear board
        this.clearBoard();

        // remake board with cells in order, last 3 empty
        this.makeGrid(currentCards);

    }
    clearBoard(){
        for(let coord of Array.from(this.grid.keys())){
            this.grid.set(coord, new CellState(coord));
        }
    }

    fillEmptySlots(coords, cards){

        let coordIndex=0;
        let cardIds = Array.from(cards.keys());

        for(let cardId of cardIds){
            const newCell = new CellState(coords[coordIndex],cards.get(cardId));
            this.grid.set(coords[coordIndex],newCell);
            coordIndex++;
        }
    }
    
    selectCard(coord){

        const card = this.grid.get(coord).card;
        this.grid.get(coord).selected=true;
        this.selectedCards.set(coord,card);
    }

    clearSet(coords){
        for(let coord of Array.from(this.selectedCards.keys())){
            this.grid.set(coord, new CellState(coord));
        }
    }

    deselectNonSet(coords){
        for(let coord of Array.from(this.selectedCards.keys())){
            this.grid.get(coord).selected=false;
        }
    }
    showGridSelectionsStatus(){
        this.grid.forEach(cell=>console.log('Selected: ',cell.selected));
    }

    clearSelectedCards(){
        this.selectedCards.clear();
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
    selectedCards: { map: Card }
});

exports.BoardState = BoardState;