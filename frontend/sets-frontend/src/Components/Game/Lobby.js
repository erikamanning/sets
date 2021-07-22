import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import {getRandName} from "./RoomHelpers"

import * as Colyseus from 'colyseus.js';

const Lobby = () => {

    let {roomId} = useParams();
    let client = useRef(null); // why?

    const [currentRoomId, setCurrentRoomId] = useState(false);
    const [room, setRoom] = useState(false);
    const [players, setPlayers] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(false);

    useEffect(()=>{
        client = new Colyseus.Client('ws://localhost:5000');
        const randName = getRandName();

        const createRoom = async (client) => {
            try {
                const roomResp = await client.joinOrCreate("sets_multiplayer", {username: randName}).then((roomResp)=>{
                    
                    console.log("joined successfully", roomResp);
                    console.log("room id", roomResp.id);
                    setRoom(roomResp);
                    setCurrentRoomId(roomResp.id);
                    setCurrentPlayer({
                        username: randName,
                        sessionId: roomResp.sessionId
                    });
                    roomResp.state.players.onAdd = (player,key)=>{
                        // console.log(`player ${key}: `, player);
                        setPlayers(p=>({
                            [key]:player,
                            ...p
                        }));
                    }
                });
            } 
            catch (e) {
                console.error("join error", e);
            }
        }
        const joinRoom = async (client) => {
            try {
                const roomResp = await client.joinById(roomId, {username: randName});
                console.log("joined successfully", roomResp);
                console.log("room id", roomResp.id);
                setRoom(roomResp);
                setCurrentRoomId(roomResp.id);

                roomResp.state.players.onAdd = (player,key)=>{
                    // console.log(`player ${key}: `, player);
                    setPlayers(p=>({
                        [key]:player,
                        ...p
                    }));
                }
            } 
            catch (e) {
                console.error("join error", e);
            }
        }

        if(roomId){
            console.log('Joining room....')
            joinRoom(client);

        }
        else{
            console.log('Creating room....')
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
        {
            players
            ? Object.keys(players).map(key=> <p key={key}>Player {players[key].playerNumber}: <b>{players[key].username}</b></p>)
            : null 
        }
        
    </div>

}


export default Lobby;