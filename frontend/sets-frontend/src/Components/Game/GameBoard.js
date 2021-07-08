import React, {useState, useEffect, useRef} from "react"
import GameCard from './GameCard.js'
import * as Colyseus from 'colyseus.js';

const GameBoard = ({room}) => {

    const [cardsRemaining, setCardsRemaining] = useState(81);
    const [board, setBoard] = useState(false);
    const [score, setScore] = useState(null);
    const [stateChanged, seStateChanged] = useState(false);

    // room.onStateChange((state) => {
    //     console.log('*************************');
    //     console.log('ROOM STATE HAS CHANGED');
    //     console.log("CURRENT BOARD STATE: ", state.board.grid);
    //     setBoard(state.board.grid);
    //     seStateChanged(sc=>!sc);

    // });

    useEffect(()=>{

        room.onStateChange((state) => {
            console.log('*************************');
            console.log('ROOM STATE HAS CHANGED');
            console.log("CURRENT BOARD STATE: ", state.board.grid);
            setBoard(state.board.grid);
            seStateChanged(sc=>!sc);
    
        });

    },[selectCard,addRow]);

    function selectCard(coord) {

        room.send('select_card', coord);
    }

    function addRow(){

        room.send('add_row');
    }

    function displayBoard(){
        return  <div className='row justify-content-center'>
                    <div className="col-12 col-sm-10 col-lg-8">
                        <div className="row g-0">
                            {console.log('HELLO FROM DISPLAY BOARD')}                            
                            {Array.from(board.keys()).map((cell) => <div key={board.get(cell).card.id} className="col-4"><GameCard coord={cell} cardIsSelected={board.get(cell).selected} selectCard = {selectCard} card={board.get(cell).card}/></div>)}
                        </div>
                    </div>
                </div>
    }

    console.log('RENDERING GAMEBOARD...');
    
    return  <div>
                <h2>Cards left in deck: {cardsRemaining} </h2>
                <h1>Score: {score}</h1>
        
                { room && board &&  Array.from(board.keys()).length<15 
                    ? 
                        <button onClick={addRow} className='btn btn-primary'>
                            Draw 3 cards
                        </button> 
                    : 
                        null
                }
                { board ? displayBoard() : null}
    </div>
    
}

export default GameBoard;