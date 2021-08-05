
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
                                    { Array.from(players.keys()).map(key=> <LobbyPlayerListItem key={key} player={players.get(key)} />)}
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