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

    getActiveCardCount(){

        let count = 0;
        let cells = Array.from(this.grid.keys())

        for(let cell of cells){
            if(this.grid.get(cell).card){
                count++;
            }
        }
        return count;
    }

    shiftGridCards(){

        console.log('Shifting spread out cards back to 4 rows...');
        let allCells = Array.from(this.grid.values());
        allCells.forEach(cell=>cell.printDetails());

        console.log('**********************************');

        let currentCells = Array.from(this.grid.values()).filter(cell=>cell.card);
        currentCells.forEach(cell=>cell.printDetails());

        let cellIndex = 0;
        let gridIndices = Array.from(this.grid.keys());
        // gridIndices.forEach(gi=>console.log('gi: ',gi));

        for(let gridIndex of gridIndices){
            if(cellIndex<currentCells.length){
                let newCell = currentCells[cellIndex];
                this.grid.set(gridIndices[gridIndex], newCell);
                cellIndex++;
            }
            else{
                this.grid.set(gridIndices[gridIndex], new CellState(gridIndices[gridIndex]));
            }
        }
    }

    fillEmptySlots(coords, cards){

        console.log('Filling Empty Slots: ', coords);

        let coordIndex=0;
        let cardIds = Array.from(cards.keys());

        for(let cardId of cardIds){

            const newCard = cards.get(cardId);
            const newCell = new CellState(coords[coordIndex],newCard);
            this.grid.set(coords[coordIndex],newCell);
            coordIndex++;
            // console.log('Filled Slot: ', this.grid.get(coords[coordIndex]));
            // console.log('Card: ', cards[cardId]);
        }
        // console.log('GRID AFTER EMPTY SLOTS ARE FILLED')
        // console.log(this.printGrid())
    }
    
    selectCard(coord){

        console.log("Selecting card...");
        // console.log('Current Grid: ', this.grid);
        const card = this.grid.get(coord).card;

        // console.log(`Selecting card... ${coord}`);
        this.grid.get(coord).selected=true;
        // console.log("SELECTED WORKED? : ", this.grid.get(coord).selected);
        this.selectedCards.set(coord,card);

        // console.log(this.grid.get(coord), ' has been selected!');
        // console.log(`CURRENTLY SELECTED CARDS: `, this.selectedCards);
    }

    clearSet(coords){
        console.log('Grid after cards cleared: ');
        for(let coord of Array.from(this.selectedCards.keys())){
            this.grid.set(coord, new CellState());
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