
import React from "react"

const GameDashboard = ({currentPlayer,players,cardsRemaining, addRow, quitGame}) => {

    return (
        <div className='row justify-content-center'>
            <div className="col-12 col-sm-10 col-lg-8">
                <div className='border border-light rounded'>
                    <p><b>Cards Remaining: </b> <i>{cardsRemaining}</i></p>
                    {cardsRemaining 
                    
                        ? <button onClick={addRow} className='btn btn-info'>Add Row</button>
                        : <p className='text-danger'><i>No cards left to draw!</i></p>
                    }
                    <button onClick={quitGame} className='btn btn-secondary'>Quit?</button>
                </div>
            </div>
        </div>
    )
}


export default GameDashboard;