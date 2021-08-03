import React, { useEffect, useState} from "react"
import {useSelector} from "react-redux"
import GameRoom from './GameRoom'
import GuestIdForm from "./GuestIdForm.js"
import * as Colyseus from 'colyseus.js';
import {getRandomIntInclusive} from './RoomHelpers'

const Create = ({mode='sets_multiplayer'}) => {
    
    // if user logged in, set username to logged in username

    // else if multiplayer, render form to create username
    
    // otherwise render gameroom with no username, 
        // since it does not matter at all in any way shape or form


    let client;
    const user = useSelector(state=>state.user);

    console.log('CREATE -- user: ', user.username);

    const [room,setRoom] = useState(false);
    const [loggedIn, setLoggedIn] = useState(user.username ? true :false);
    const [guestUser, setGuestUser] = useState(false);

    useEffect(()=>{

        if(mode!=='sets_multiplayer' && !loggedIn){
            setGuestUser(`guest${getRandomIntInclusive(1000,9999)}`);
        }

    },[]);

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
                    !loggedIn && mode==='sets_multiplayer'
                        ?  <GuestIdForm addGuest={addGuest}/>
                        : null
                }
            </div>
    )
}


export default Create;