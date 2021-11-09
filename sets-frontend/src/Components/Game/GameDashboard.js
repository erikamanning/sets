
import React, {useContext} from "react"
import GameContext from './GameContext'
import GameScoreTable from './GameScoreTable'

const GameDashboard = () => {

    const {addRow, endGame,deck, game, players, scoreboard} = useContext(GameContext);

    return (
            <div className='row justify-content-center my-3'>
                <div className="col-12 col-md-10 col-lg-8">
                    <div className='border border-5 border-primary rounded p-3'>

                        <div className='d-flex justify-content-between'>
                            <div className='text-start'>
                                <span className='text-danger fw-bold'>Mode: </span>
                                <span className='badge rounded-pill bg-primary'>{game.mode.charAt(0).toUpperCase() + game.mode.slice(1)}</span>
                            </div>

                            <div className='text-end'>
                                <button onClick={endGame} className='btn btn-danger text-white'>Quit?</button>
                            </div>
                        </div>


                        {
                            game.mode==='singleplayer'
                            ? <h1 className='display-1'>Score: <span className='text-danger'>{scoreboard.entries().next().value[1].score}</span></h1>
                            : <GameScoreTable />
                        }

                        <div className='d-flex justify-content-between'>
                            <h5 className='display-5'>Deck: <span className='text-danger'>{deck.cards.size}</span></h5>

                            {deck.cards.size 
                            
                            ? <button onClick={addRow} className='btn btn-primary mx-1'>Add Row</button>
                            : <p className='text-danger'><i>No cards left to draw!</i></p>
                            }
                        </div>

                        {/* {game.mode==='multiplayer'
                            ? <p>Whose Turn: {players.get(game.turn).username}</p>
                            : null
                        } */}
                    </div>
                </div>
            </div>
    )
}


export default GameDashboard;