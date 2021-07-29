
import React, {useContext} from "react"
import GameContext from './GameContext'

const Lobby = () => {

    const {room,players,startMatch, loggedIn} = useContext(GameContext);

    return <div>

        <h1 className='mt-5'>This is the Lobby!</h1>
        {
            room.id 
            ? <p><b>Room Id: </b> {room.id}</p>
            : null
        }
        {
            players
            ? Object.keys(players).map(key=> <p key={key}>Player {players[key].playerNumber}: <b>{players[key].username}</b></p>)
            : null 
        }

        <button className='btn btn-info' onClick={startMatch}>Ready?</button>

    </div>

}


export default Lobby;