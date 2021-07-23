import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import {getRandName} from "./RoomHelpers"
import Game from './Game'
import Lobby from './Lobby'

import * as Colyseus from 'colyseus.js';

const GameRoom = ({mode}) => {

    let {roomId} = useParams();
    let client = useRef(null); // why?

    const [currentRoomId, setCurrentRoomId] = useState(roomId || false);
    const [room, setRoom] = useState(false);
    const [players, setPlayers] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(false);
    const [stateChanged, seStateChanged] = useState(false);
    const [board,setBoard] = useState(false);

    useEffect(()=>{
        client = new Colyseus.Client('ws://localhost:5000');
        const randName = getRandName();

        const createRoom = async (client) => {
            try {
                const roomResp = await client.joinOrCreate(mode, {username: randName}).then((roomResp)=>{
                    
                    console.log("joined successfully", roomResp);
                    console.log("room id", roomResp.id);
                    setRoom(roomResp);
                    setCurrentRoomId(roomResp.id);
                    setCurrentPlayer({
                        username: randName,
                        sessionId: roomResp.sessionId
                    });
                    roomResp.state.players.onAdd = (player,key)=>{
                        setPlayers(p=>({
                            [key]:player,
                            ...p
                        }));
                    }
                    roomResp.onStateChange((state) => {

                        console.log('!!!!!!!!!!!!!!');
                        console.log('state changed!');
                        console.log('state started?: ', state.started);
                        if(state.started == true){
                            setStartGame(true);
                        }
                        setBoard(state.board.grid);
                        seStateChanged(changed=>!changed);
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
                    console.log('!!!!!!!!!!!!!!');
                    console.log('state changed!');
                    console.log('state started?: ', state.started);
                    if(state.started == true){
                        setStartGame(true);
                    }
                    setBoard(state.board.grid);
                    seStateChanged(changed=>!changed);
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

        { room && board && startGame && currentRoomId
            ? <Game gRoom={room} gPlayers={players} gBoard={board} gCurrentPlayer={currentPlayer}/> 
            : <Lobby players={players} roomId={currentRoomId} startMatch={startMatch}/>
        }
        
    </div>
}


export default GameRoom;