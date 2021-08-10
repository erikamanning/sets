import React, { useEffect, useState} from "react"
import {useSelector} from "react-redux"
import GameRoom from './GameRoom'
import GuestIdForm from "./GuestIdForm.js"
import * as Colyseus from 'colyseus.js';
import JoinRoomIdForm from "./JoinRoomIdForm";

const Join = ({mode='sets_multiplayer'}) => {
    
    let client;
    const user = useSelector(state=>state.user);
    const [roomCode, setRoomCode] = useState(false);
    const [room,setRoom] = useState(false);
    const [username, setUsername] = useState(false);

    useEffect(()=>{

        if(user.username)
            setUsername(user.username);
        

    },[]);


    useEffect(()=>{
        const joinRoom = async (mode,userId) => {
            client = new Colyseus.Client('ws://localhost:5000');

            try {
                const room = await client.joinById(roomCode, {username: userId});
                setRoom(room);
            } 
            catch (e) {
                console.error("join error", e);
                alert('Invalid room code!');
                setRoomCode(false);
            }
        }

        if(username){
            console.log('Creating game for logged in user...');
            joinRoom(mode,username);
        }

    },[username,roomCode]);

    function saveRoomCode(code){

        setRoomCode(code);
    }

    function addGuest(username){
        setUsername(username);
    }

    return (
            <div className='mt-5'>
                {!room ? <h1>Join a Game</h1> : null}
                {
                    !roomCode
                        ? <JoinRoomIdForm saveRoomCode={saveRoomCode}/>
                        : null
                }
                {
                    !username && roomCode
                        ?  <GuestIdForm addGuest={addGuest}/>
                        : null
                }
                {
                    room 
                        ? <GameRoom room={room} guestUsername={!user.username ? username : false}/>
                        : null
                }
            </div>
            )

}


export default Join;