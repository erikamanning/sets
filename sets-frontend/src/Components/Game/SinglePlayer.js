
import React, { useEffect, useState} from "react"
import * as Colyseus from 'colyseus.js';
import GameRoom from './GameRoom'

const SinglePlayer = ({username}) => {

    let client;
    const [room, setRoom] = useState(false);

    useEffect(()=>{
        client = new Colyseus.Client('ws://localhost:5000');
        client.getAvailableRooms("sets_singleplayer").then(rooms => {
            // console.log('SINGLEPLAYER -- getting rooms data');
            rooms.forEach((room) => {
                // console.log('roomId: ',room.roomId);
                // console.log('clients: ',room.clients);
                // console.log('maxClients: ',room.maxClients);
                // console.log('metadata: ',room.metadata);
            });
          }).catch(e => {
            console.error(e);
          });
        async function createRoom(){
            try {
                const room = await client.create("sets_singleplayer", {username});
                // console.log("joined successfully", room);
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
                ? <GameRoom room={room} username={username} mode='singleplayer'/>
                : <p>...Creating Room </p>
            }
        </div>
    ) 
}


export default SinglePlayer;