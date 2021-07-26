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
    const [deck, setDeck] = useState(false);
    const [players, setPlayers] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(false);
    const [stateChanged, seStateChanged] = useState(false);
    const [board,setBoard] = useState(false);

    function setUpGame(room, username){

        setRoom(room);
        setCurrentRoomId(room.id);
        setCurrentPlayer({
            username,
            sessionId: room.sessionId
        });
        room.state.players.onAdd = (player,key)=>{
            setPlayers(p=>({
                [key]:player,
                ...p
            }));
        }
        room.onStateChange((state) => {

            if(state.started == true)
                setStartGame(true);
            if(state.finished == true)
                setGameFinished(true);
            
            setBoard(state.board.grid);
            setDeck(d=>state.deck);
            seStateChanged(changed=>!changed);
        });
    }

    useEffect(()=>{
        client = new Colyseus.Client('ws://localhost:5000');
        const randName = getRandName();

        const createRoom = async (client) => {
            try {
                await client.joinOrCreate(mode, {username: randName})
                .then((room)=>setUpGame(room,randName));
            } 
            catch (e) {
                console.error("join error", e);
            }
        }
        const joinRoom = async (client) => {
            try {
                const roomResp = await client.joinById(roomId, {username: randName});
                setUpGame(roomResp,randName);
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

    if(board){
        console.log('Board: ');

        board.forEach(cell=>console.log('Selected: ', cell.selected));
    }

    return <div>

        { room && board && startGame && currentRoomId && deck
            ? <Game gFinished={gameFinished} gRoom={room} gPlayers={players} gBoard={board} gCurrentPlayer={currentPlayer} gDeck={deck}/> 
            : <Lobby players={players} roomId={currentRoomId} startMatch={startMatch}/>
        }
        
    </div>
}


export default GameRoom;