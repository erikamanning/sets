import React, {useContext} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'
import GameContext from './GameContext'
import GameResult from './GameResult'
import { Prompt } from 'react-router'
import SinglePlayerResult from './SinglePlayerResult'
import { Container } from "reactstrap"
const Game = () => {

    const {game,viewResult, showResult} = useContext(GameContext);

    // console.log('VIEWRESULT: ', viewResult);
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
                    <p className='text-danger Game-Over'>Game Over!</p>
                    <button onClick={showResult} className='btn btn-primary'>View Result?</button>
                </div>
            )
        }
        else{
            display = (

                game.mode==='singleplayer'
                ? 
                    <SinglePlayerResult />
                :
                    <GameResult/>
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