
import React, {useContext} from "react"
import GameContext from './GameContext'
import GameScoreTable from './GameScoreTable'

const GameDashboard = () => {

    const {user, addRow, endGame,deck, game, players} = useContext(GameContext);

    return (
        <div className='row justify-content-center'>
            <div className="col-12 col-sm-10 col-lg-8">
                <div className='border border-light rounded'>

                    {/* <h3># of Sets on board: {game.currentSetCount}</h3> */}

                    {/* <p><b>You: </b> {user.username}</p> */}
                    <GameScoreTable />
                    <p><b>Cards Remaining: </b> <i>{deck.cards.size}</i></p>
                    {deck.cards.size 
                    
                        ? <button onClick={addRow} className='btn btn-info'>Add Row</button>
                        : <p className='text-danger'><i>No cards left to draw!</i></p>
                    }

                    {console.log('players: ', players)}
                    {game.mode==='multiplayer' &&  game.turn!== 'any'
                     ? <p>Whose Turn: {players.get(game.turn).username}</p>
                     :<p>Whose Turn: {game.turn}</p>
                    }
                    <button onClick={endGame} className='btn btn-secondary'>Quit?</button>
                </div>
            </div>
        </div>
    )
}


export default GameDashboard;