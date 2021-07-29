import React, { useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {createRoom} from "./RoomHelpers.js"
import GameRoom from './GameRoom'
import GuestIdForm from "./GuestIdForm.js"

const Create = ({mode='sets_multiplayer'}) => {
    console.log('RENDERING CREATE COMPONENT');

    const user = useSelector(state=>state.user);
    const [room,setRoom] = useState(false);
    const [guestUser, setGuestUser] = useState(false);
    const [userSet, setUserSet] = useState(false);

    useEffect(()=>{
        console.log('USEEFFECT');
        async function myCreateRoom(mode, username){
            let resp = await createRoom(mode,username);
            console.log('resp: ', resp);
            setRoom(resp.room);
        }

        if(user.username){
            console.log('Creating game for logged in user...');
            myCreateRoom(mode,user.username);
        }
        else if(guestUser){
            console.log('Creating game for guest user...');
            myCreateRoom(mode,guestUser);
        }
    },[user]);

    // if(room){
        console.log('ROOM: ', room);
    // }

    return (
            <div>
                <h1>Create a new game!</h1>
                {/* {
                    !user.username 
                        ?  <GuestIdForm />
                        : null
                } */}
                {
                    room 
                        ? <GameRoom room={room}/>
                        : <h5>No room yet!</h5>
                }
            </div>
            )

}


export default Create;