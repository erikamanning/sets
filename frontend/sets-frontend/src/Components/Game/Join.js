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
    const [guestUser, setGuestUser] = useState(false);

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

        if(roomCode){
            if(user.username){
                console.log('Creating game for logged in user...');
                joinRoom(mode,user.username);
            }
            else if(guestUser){
                console.log('Creating game for guest user...');
                joinRoom(mode,guestUser);
            }
        }
    },[user,guestUser,roomCode]);

    function saveRoomCode(code){

        setRoomCode(code);
    }

    function addGuest(username){
        setGuestUser(username);
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
                    (!user.username && !guestUser ) && roomCode
                        ?  <GuestIdForm addGuest={addGuest}/>
                        : null
                }
                {
                    room 
                        ? <GameRoom room={room} guestUser={guestUser}/>
                        : null
                }
            </div>
            )

}


export default Join;