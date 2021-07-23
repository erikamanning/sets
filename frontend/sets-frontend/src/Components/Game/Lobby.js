
import React from "react"

const Lobby = ({roomId,players,startMatch}) => {

    return <div>

        <h1 className='mt-5'>This is the Lobby!</h1>
        {
            roomId 
            ? <p><b>Room Id: </b> {roomId}</p>
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