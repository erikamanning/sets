import React, { useState, useEffect, useRef } from "react"
import * as Colyseus from 'colyseus.js';

const Lobby = ({roomId}) => {

    let client = useRef(null); // why?

    const [currentRoomId, setCurrentRoomId] = useState(false);
    const [room, setRoom] = useState(false);

    useEffect(()=>{
        const createRoom = async (client) => {
            try {
                const roomResp = await client.create("sets_multiplayer", {/* options */});
                console.log("joined successfully", roomResp);
                console.log("room id", roomResp.id);
                setRoom(roomResp);
                setCurrentRoomId(roomResp.id);

              
              } catch (e) {
                console.error("join error", e);
              }
        }

        if(roomId){
            console.log('Joining room....')
        }
        else{
            console.log('Creating room....')
            client = new Colyseus.Client('ws://localhost:5000');
            createRoom(client);
        }

    },[]);

    return <div>

        <h1 className='mt-5'>This is the Lobby!</h1>
        {
            currentRoomId 
            ? <p><b>Room Id: </b> {currentRoomId}</p>
            : null
        }
        

        

    </div>

}


export default Lobby;