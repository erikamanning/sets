
import React, { useEffect, useState, useContext} from "react"
import * as Colyseus from 'colyseus.js';
import GameRoom from './GameRoom'
import RoomIdForm from './RoomIdForm'
import RoomContext from "./RoomContext";

const Multiplayer = ({username}) => {

    const {id} = useContext(RoomContext); // may also be able to do with useParams since url is unchanged at this point
    let client;

    const [room, setRoom] = useState(false);
    const [roomId, setRoomId] = useState(id||false);
    const [create, setCreate] = useState(false);
    const [join, setJoin] = useState(id||false);

    useEffect(()=>{
        client = new Colyseus.Client('ws://localhost:5000');
        async function createRoom(){
            try {
                const room = await client.create("sets_multiplayer", {username});
                console.log("joined successfully", room);
                setRoom(room);
            } 
            catch (e) {
                console.error("join error", e);
            }
        }
        
        async function joinRoom(roomId){
            try {
                const room = await client.joinById(roomId, {username});
                console.log("joined successfully", room);
    
                // set Room state
                setRoom(room);
            } 
            catch (e) {
                console.error("join error", e);
            }
        }

        if(create){
            console.log('Client wants to CREATE & JOIN!');
            createRoom();
        }
        else if(join){
            console.log('Client wants to JOIN!');
            joinRoom(roomId);
        }

    },[create,join]);

    function handleJoin(roomId){
        setRoomId(roomId);
        setJoin(true);
    }

    return (
        <div>
            {
                room
                ? <GameRoom room={room} username={username}/>
                : (
                    <div>
                        <div>
                            <h5 className='mt-5'>Create a New Game or Join Existing Game?</h5>
                            <button onClick={ ()=>{setCreate(true)} } className='btn btn-lg btn-secondary m-1'>Create New Game</button>
                        </div>

                        <div>
                            <h3>Join (enter code):</h3>
                            <RoomIdForm handleJoin={handleJoin}/>                        
                        </div>
                    </div>
                )
            }

        </div>
    ) 
}


export default Multiplayer;