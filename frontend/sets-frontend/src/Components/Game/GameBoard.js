import React, {useState, useEffect, useRef} from "react"
import GameCard from './GameCard.js'
import * as Colyseus from 'colyseus.js';

const GameBoard = ({room}) => {

    const [cardsRemaining, setCardsRemaining] = useState(81);
    const [board, setBoard] = useState(false);
    const [score, setScore] = useState(null);
    const [stateChanged, seStateChanged] = useState(false);


    useEffect(()=>{
        async function updateBoard(){
            room.onStateChange((state) => {
                console.log('*************************');
                console.log('PREVIOUS BOARD STATE: ', board);
                console.log("CURRENT BOARD STATE: ",state.board.grid);
                setBoard(state.board.grid); 
                seStateChanged(sc=>!sc); 
                // seems that react is not recognizing a change in the state
                // so it's not rerendering because it thinks the state is the same
                // may be because of the depth of the properties
            });
        }
        updateBoard();

    },[]);

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