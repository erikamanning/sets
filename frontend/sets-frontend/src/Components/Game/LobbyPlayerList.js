
import React, {useContext} from "react"
import GameContext from './GameContext'
import LobbyPlayerListItem from './LobbyPlayerListItem'

const LobbyPlayerList = () => {

    const {players} = useContext(GameContext);

    return <div className='row justify-content-center'>
        <div className="col-12 col-md-6 col-lg-3">


            {
                players
                ?   (
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <ul>
                                    { Object.keys(players).map(key=> <LobbyPlayerListItem key={key} player={players[key]} />)}
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