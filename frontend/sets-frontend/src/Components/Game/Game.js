import React, {useState, useEffect, useRef} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'

const Game = ({gFinished, gRoom, gPlayers,gBoard, gCurrentPlayer, gDeck}) => {

    function selectCard(coord) {

        gRoom.send('select_card', coord);
    }

    function addRow(){

        gRoom.send('add_row');
    }

    function endMatch(){
        gRoom.send('quit');
    }

    return (
        
        <div>

            <GameDashboard quitGame={endMatch} addRow={addRow} currentPlayer={gCurrentPlayer} players={gPlayers} cardsRemaining={gDeck.cards.size}/>

            { !gFinished 
                ? <GameBoard board={gBoard} selectCard={selectCard} addRow={addRow}/> 
            : <h1 className='text-danger'>Game Over! Top Score: {gRoom.state.topScore}</h1> }
        </div>
    )
}

export default Game;