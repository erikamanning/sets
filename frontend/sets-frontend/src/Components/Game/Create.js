import React, { useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {createRoom} from "./RoomHelpers.js"
import GameRoom from './GameRoom'
import GuestIdForm from "./GuestIdForm.js"
import * as Colyseus from 'colyseus.js';


const Create = ({mode='sets_multiplayer'}) => {
    
    let client;
    const user = useSelector(state=>state.user);
    const [room,setRoom] = useState(false);
    const [guestUser, setGuestUser] = useState(false);

    useEffect(()=>{
        const createRoom = async (mode,userId) => {
            client = new Colyseus.Client('ws://localhost:5000');

            try {
                await client.joinOrCreate(mode, {username:userId})
                .then((room)=>setRoom(room));
            } 
            catch (e) {
                console.error("join error", e);
            }
        }

        if(user.username){
            console.log('Creating game for logged in user...');
            createRoom(mode,user.username);
        }
        else if(guestUser){
            console.log('Creating game for guest user...');
            createRoom(mode,guestUser);
        }
    },[user,guestUser]);

    function addGuest(username){
        setGuestUser(username);
    }

    return (
            <div className='mt-5'>
                {
                    room 
                        ? <GameRoom room={room} guestUser={guestUser}/>
                        : <h1>Create a New Game</h1>
                }
                {
                    !user.username && !guestUser
                        ?  <GuestIdForm addGuest={addGuest}/>
                        : null
                }
            </div>
            )

}


export default Create;