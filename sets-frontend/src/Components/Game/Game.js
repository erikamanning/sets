import React, {useContext} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'
import GameContext from './GameContext'
import GameResult from './GameResult'
import { Prompt } from 'react-router'
import SinglePlayerResult from './SinglePlayerResult'

const Game = () => {

    const {game} = useContext(GameContext);

    const showDisplay = () => {

        let display;

        if(!game.finished){

            display = (
                <div className='container'>
                    <GameDashboard />
                    <GameBoard />
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

            {showDisplay()}
        </div>
    )
}

export default Game;