
import React, {useContext} from "react"
import GameContext from './GameContext'
import LobbyPlayerList from './LobbyPlayerList'

const Lobby = () => {

    const {room,players,startMatch, user,loggedIn} = useContext(GameContext);

    return <div>

        <h1 className='my-5'>Lobby</h1>

        <h5>Welcome, <u className='text-info'>{user}</u>!</h5>

        {
            room.id 
            ? <p><b>Room Id: </b> {room.id}</p>
            : null
        }
        <LobbyPlayerList/>

        <button className='btn btn-info' onClick={startMatch}>Ready?</button>

    </div>

}


export default Lobby;