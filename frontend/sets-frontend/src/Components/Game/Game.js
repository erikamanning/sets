import React, {useContext} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'
import GameContext from './GameContext'
import GameResult from './GameResult'

const Game = () => {

    const {game} = useContext(GameContext);
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
        else{
            display = <div>
                <GameResult/>
            </div>
        }

        return display;

    }

    return (
        
        <div>
            {showDisplay()}
        </div>
    )
}

export default Game;