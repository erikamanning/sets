
import React, {useContext} from "react"
import GameContext from './GameContext'

const LobbyPlayerList = () => {

    const {players, startMatch} = useContext(GameContext);

    return <div className='row justify-content-center'>
        <div className="col-12 col-md-6 col-lg-3">
            {
                players
                ?   (
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6 col-lg-3">
                                <ul>
                                    { Object.keys(players).map(key=> <li key={key}><b>{players[key].username}</b></li>)}
                                </ul>
                            </div>
                        </div>
                    )
                    : null 
            }
        </div>
    </div>

}


export default LobbyPlayerList;