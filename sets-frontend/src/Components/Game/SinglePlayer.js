
import React, { useEffect, useState} from "react"
import * as Colyseus from 'colyseus.js';
import GameRoom from './GameRoom'

const SinglePlayer = ({username}) => {

    let client;
    const [room, setRoom] = useState(false);

    useEffect(()=>{
        client = new Colyseus.Client('ws://localhost:5000');
        async function createRoom(){
            try {
                const room = await client.create("sets_singleplayer", {username});
                console.log("joined successfully", room);
                setRoom(room);
            } 
            catch (e) {
                console.error("join error", e);
            }
        }
        createRoom();
    },[]);

    return (
        <div>
            {
                room
                ? <GameRoom room={room} username={username}/>
                : <p>...Creating Room </p>
            }
        </div>
    ) 
}


export default SinglePlayer;