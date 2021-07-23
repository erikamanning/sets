import React, {useState, useEffect, useRef} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'

const Game = ({gRoom, gPlayers,gBoard, gCurrentPlayer}) => {

    function selectCard(coord) {

        gRoom.send('select_card', coord);
    }

    function addRow(){

        gRoom.send('add_row');
    }
    return (
        
        <div>

            <GameDashboard currentPlayer={gCurrentPlayer} players={gPlayers}/>

            { gBoard ? <GameBoard board={gBoard} selectCard={selectCard} addRow={addRow}/> : null }
        </div>
    )
}

export default Game;