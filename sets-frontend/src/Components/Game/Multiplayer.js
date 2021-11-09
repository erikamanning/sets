
import React, { useEffect, useState, useContext} from "react";
import { useHistory } from "react-router";
import * as Colyseus from 'colyseus.js';
import GameRoom from './GameRoom'
import RoomIdForm from './RoomIdForm'
import RoomContext from "./RoomContext";
import UserContext from "./UserContext";
import './Multiplayer.css'

const Multiplayer = ({username}) => {

    const {id} = useContext(RoomContext); // may also be able to do with useParams since url is unchanged at this point
    const {roomIds, addRoomId, checkRoomId} = useContext(UserContext); 
    
    console.log('Current ROOM-IDs: ', roomIds);

    let client;

    const [room, setRoom] = useState(false);
    const [roomId, setRoomId] = useState(id||false);
    const [create, setCreate] = useState(false);
    const [join, setJoin] = useState(id||false);
    const history = useHistory();

    useEffect(()=>{
        client = new Colyseus.Client('ws://localhost:5000');

        client.getAvailableRooms("sets_multiplayer").then(rooms => {
                rooms.forEach((room) => {
            });
          }).catch(e => {
            console.error(e);
          });

        async function createRoom(){
            try {
                const room = await client.create("sets_multiplayer", {username});
                addRoomId(room.id);
                setRoom(room);
            } 
            catch (e) {
                console.error("join error", e);
            }
        }
        
        async function joinRoom(roomId){
            try {
                const room = await client.joinById(roomId, {username});
                addRoomId(room.id);

                // set Room state
                setRoom(room);
            } 
            catch (e) {
                console.error("join error", e);
            }
        }

        if(create){
            createRoom();
        }
        else if(join){
            if(checkRoomId(roomId))
                joinRoom(roomId);
            else{
                history.push('/');
                alert('You are already in this room in another tab/window! You cannot join the same game twice!');
            }
        }

    },[create,join]);

    function handleJoin(roomId){
        setRoomId(roomId);
        setJoin(true);
    }

    return (
        <div className='container'>
            {
                room
                ? <GameRoom room={room} username={username} mode='multiplayer'/>
                : (
                    <div className='row justify-content-center mt-5'>
                        <div className='col-12 col-md-8 border border-5 border-primary rounded p-5 mx-1'>
                            <div>
                                <h1 className='text-danger mb-3'>Create a New Game</h1>
                                <button onClick={ ()=>{setCreate(true)} } className='btn btn-lg btn-primary m-1'>Create</button>
                            </div>

                            <div className='mt-5'>
                                <h1 className='text-danger'>Join Existing Game</h1>
                                <RoomIdForm handleJoin={handleJoin}/>                        
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    ) 
}


export default Multiplayer;