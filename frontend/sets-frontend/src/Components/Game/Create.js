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

    console.log('comp: [ CREATE ] -- user: ', user.username);

    const [room,setRoom] = useState(false);
    const [username, setUsername] = useState(false);
    console.log('user: ', user);

    useEffect(()=>{

        if(user.username){
            setUsername(user.username);
        }
        else{
            if(mode==='sets_singleplayer'){
                setUsername(`guest${getRandomIntInclusive(1000,9999)}`);
            }
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

        if(username){
            createRoom(mode,username);
        }

    },[username]);

    function addGuest(username){
        setUsername(username);
    }

    return (
            <div className='mt-5'>
                {
                    room 
                        ? <GameRoom room={room} guestUsername={!user.username ? username : false}/>
                        : <h1>Create a New Game</h1>
                }
                {
                    !username
                        ?  <GuestIdForm addGuest={addGuest}/>
                        : null
                }
            </div>
    )
}


export default Create;