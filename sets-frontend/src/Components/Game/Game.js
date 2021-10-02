import React, {useContext} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'
import GameContext from './GameContext'
import GameResult from './GameResult'
import { Prompt } from 'react-router'

const Game = () => {

    const {game,viewResult, showResult} = useContext(GameContext);

    console.log('VIEWRESULT: ', viewResult);
    const showDisplay = () => {

        let display;

        if(!game.finished){

            display = (
                <div>
                    <GameDashboard />
                    <GameBoard />
                </div>
            )
        }

        else if(game.finished && !viewResult){
            display = (
                <div>
                    <h3>Game Over</h3>
                    <button onClick={showResult} className='btn btn-secondary'>View Result?</button>
                </div>
            )
        }
        else{
            display = (
                <div>
                    <GameResult/>
                </div>
            )
        }

        return display;

    }

    return (
        
        <div>
                <Prompt
                when={!game.finished}
                message='You have unsaved changes, are you sure you want to leave?'
                />
                {/* Component JSX */}
            {showDisplay()}
        </div>
    )
}

export default Game;