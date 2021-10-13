import React, {useContext} from "react"
import GameContext from './GameContext'
import GameScoreTable from "./GameScoreTable"
import './GameResult.css'

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
                    <div className='mb-5'>
                        <GameScoreTable />
                        
                        {
                            game.gameResult==='win'
                            ? <div>
                                <h5 className='text-danger GameResult-result'><span className='GameResult-winner'>{game.winner.username}</span></h5> 
                                <h5 className='text-danger GameResult-result'> wins!</h5>
                            </div>
                            : <h5 className='text-danger GameResult-result'>{game.gameResult}!</h5> 
                        }
                        
                    </div>
                );
            
        }
        return results;
    }

    return (
        
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className='col-12 col-lg-6 border border-5 border-primary rounded p-5'>
                    <h1 className='display-1 text-danger mb-5'> Results</h1>
                    {showResults()}
                    <div class="d-grid gap-2 d-md-block">
                    <a className='btn btn-lg btn-primary me-1' href={`/${playAgainLink}`}>Play Again?</a>
                        <button className='btn btn-lg btn-outline-primary border-3' onClick={leave}>Leave</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameResult;