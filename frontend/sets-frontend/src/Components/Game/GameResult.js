import React, {useContext} from "react"
import GameContext from './GameContext'
import GameScoreTable from "./GameScoreTable"

const GameResult = () => {

    const {game, mode, leave} = useContext(GameContext);
    const playAgainLink = mode === 'sets_singleplayer' ? 'single' : 'multi';

    const showResults = () => {

        let results;

        if(mode==="sets_singleplayer"){
            results =  <p> Score: {game.topScore}</p> 
        }
        else{
                results=(
                    <div>
                        <GameScoreTable />
                        
                        <p> <b>Result:</b> {game.gameResult}</p> 
                        <p> <b>Winner:</b> {game.winner.username}</p> 

                        
                    </div>
                );
            
        }
        return results;
    }

    return (
        
        <div>
            <h1 className='text-danger'>Game Over! </h1>
            {showResults()}
            <a className='btn btn-info' href={`/${playAgainLink}`}>Play Again?</a>
            <button className='btn btn-secondary' onClick={leave}>Leave</button>
        </div>
    )
}

export default GameResult;