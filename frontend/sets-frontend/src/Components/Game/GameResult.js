import React, {useContext} from "react"
import GameContext from './GameContext'
import GameScoreTable from "./GameScoreTable"

const GameResult = () => {

    const {game, mode} = useContext(GameContext);
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
        </div>
    )
}

export default GameResult;