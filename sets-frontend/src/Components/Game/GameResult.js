import React, {useContext} from "react"
import GameContext from './GameContext'
import GameScoreTable from "./GameScoreTable"

const GameResult = () => {

    const {game, leave} = useContext(GameContext);
    const playAgainLink = game.mode === 'singleplayer' ? 'singleplayer' : 'multiplayer';
    // console.log('999999999999999999 mode: ', game.mode);
    // console.log('play again link: ', playAgainLink);
    const showResults = () => {

        let results;

        if(game.mode==="sets_singleplayer"){
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