
import React from "react"

const GameDashboard = ({currentPlayer,players,cardsRemaining}) => {

    return (
        <div className='row justify-content-center'>
            <div className="col-12 col-sm-10 col-lg-8">
                <div className='border border-light rounded'>
                    <p><b>Cards Remaining: </b> <i>Who knows...</i></p>
                </div>
            </div>
        </div>
    )
}


export default GameDashboard;