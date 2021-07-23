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
    const [startGame, setStartGame] = useState(false);
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
                    roomResp.onStateChange((state) => {
                        // console.log('STATE CHANGED');
                        // console.log('changes: ',state);
                        ////extract the values you want and transform into something you need
                        // const grid  = room.state.board.grid;
                        // setBoard(state.board.grid);
                        // seStateChanged(changed=>!changed);
                        console.log('!!!!!!!!!!!!!!');
                        console.log('state changed!');
                        console.log('state started?: ', state.started);
                        if(state.started == true){
                            setStartGame(true);
                        }

                        // console.log('players: ', state.players.forEach(player=>console.log('player: ', player)));
        
                        // room.state.players.onAdd((player,key)=>{
                        //     console.log(`player ${key}: `, player.printDetails());
                        // });
        
                    });
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

                roomResp.onStateChange((state) => {
                    // console.log('STATE CHANGED');
                    // console.log('changes: ',state);
                    ////extract the values you want and transform into something you need
                    // const grid  = room.state.board.grid;
                    // setBoard(state.board.grid);
                    // seStateChanged(changed=>!changed);
                    console.log('!!!!!!!!!!!!!!');
                    console.log('state changed!');
                    console.log('state started?: ', state.started);
                    if(state.started == true){
                        setStartGame(true);
                    }

                    // console.log('players: ', state.players.forEach(player=>console.log('player: ', player)));
    
                    // room.state.players.onAdd((player,key)=>{
                    //     console.log(`player ${key}: `, player.printDetails());
                    // });
    
                });
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

    function startMatch(){
        room.send('all_in');
    }

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

        <button onClick={startMatch}>Ready?</button>

        {
            startGame
            ? <h3 className='text-success'>Here's the game!</h3>
            : <h3 className='text-success'>Game not started yet!</h3>
        }
        
    </div>

}


export default Lobby;