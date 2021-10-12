
import React, {useContext} from "react"
import GameContext from './GameContext'
import LobbyPlayerListItem from './LobbyPlayerListItem'

const LobbyPlayerList = () => {

    const {players} = useContext(GameContext);

    return (
        <div className="">
            <h5 className='text-start'>Players: </h5>


                    {
                        players
                        ?   (
                                <div className="row justify-content-center">
                                    <ul>
                                        { Array.from(players.keys()).map(key=> <LobbyPlayerListItem key={key} player={players.get(key)} />)}
                                    </ul>
                                </div>
                            )
                            : null 
                    }
        </div>
    )

}


export default LobbyPlayerList;