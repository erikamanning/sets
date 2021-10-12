import React, {useContext} from "react"
import GameContext from './GameContext'

const SinglePlayerResult = () => {

    return (
        
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className='col-12 col-lg-6 border border-5 border-primary rounded p-5'>
                    <h1 className='display-1 text-danger'> Results</h1>
                    <div class="d-grid gap-2">
                        Score:                 
                        <a className='btn btn-lg btn-primary me-1' href='/singleplayer'>Play Again?</a>
                        <button className='btn btn-lg btn-outline-primary border-3' >Leave</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePlayerResult;