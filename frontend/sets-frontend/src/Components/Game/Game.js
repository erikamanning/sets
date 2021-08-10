import React, {useContext} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'
import GameContext from './GameContext'
import GameResult from './GameResult'

const Game = () => {

    const {game,endGame} = useContext(GameContext);
    const showDisplay = () => {

        let display;

        if(!game.finished){

            if(!game.noSetsNoCards){

                display = (
                    <div>
                        <GameDashboard />
                        <GameBoard />
                    </div>
                )
            }
            else{
                display=(
                    <div>
                        <h1>NO SETS on board & NO CARDS remaining!</h1>
                        <h5>View Results? </h5>
                        <button onClick={endGame} className='btn btn-secondary'>Results</button>
                    </div>
                )
            }
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