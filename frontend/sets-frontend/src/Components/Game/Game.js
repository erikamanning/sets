import React, {useState, useEffect, useRef} from "react"
import GameBoard from './GameBoard'

const Game = ({gRoom, gPlayers,gBoard, gCurrentPlayer}) => {

    function selectCard(coord) {

        gRoom.send('select_card', coord);
    }

    function addRow(){

        gRoom.send('add_row');
    }
    return (
        
        <div>
            {gCurrentPlayer? <p><b>Current Player: </b>{gCurrentPlayer.username}</p> : null}

            {gPlayers
                ? Object.keys(gPlayers).map(key=> <p key={key}>Player {gPlayers[key].playerNumber}: {gPlayers[key].username}  <b>score: </b>{gPlayers[key].score}</p>)
                : null 
            }

            { gBoard ? <GameBoard board={gBoard} selectCard={selectCard} addRow={addRow}/> : null }
        </div>
    )
}

export default Game;