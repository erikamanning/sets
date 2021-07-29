import React, { useState, useEffect, useRef, useContext } from "react"
import { useParams } from "react-router-dom";
import {getRandName} from "./RoomHelpers"
import Game from './Game'
import Lobby from './Lobby'
import GameContext from './GameContext'
import GuestIdForm from './GuestIdForm'

import * as Colyseus from 'colyseus.js';

const GameRoom = ({mode}) => {

    let {roomId} = useParams();
    let client = useRef(null); // why?

    const [userIdentified, setUserIdentified] = useState(false);
    const [guestId, setGuestId] = useState(false);
    const [currentRoomId, setCurrentRoomId] = useState(roomId || false);
    const [room, setRoom] = useState(false);
    const [game, setGame] = useState(false);
    const [deck, setDeck] = useState(false);
    const [players, setPlayers] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(false);
    const [stateChanged, seStateChanged] = useState(false);
    const [board,setBoard] = useState(false);


    function addGuest(username){
        setGuestId(username);
        setUserIdentified(true);
    }

    function setUpGame(room, username){

        setRoom(room);
        setGame(room.state);
        setCurrentRoomId(room.id);
        setCurrentPlayer({
            username: guestId,
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
            
            setGame(room.state);
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
                await client.joinOrCreate(mode, {username: guestId})
                .then((room)=>setUpGame(room,guestId));
            } 
            catch (e) {
                console.error("join error", e);
            }
        }
        const joinRoom = async (client) => {
            try {
                const roomResp = await client.joinById(roomId, {username: guestId});
                setUpGame(roomResp,guestId);
            } 
            catch (e) {
                console.error("join error", e);
            }
        }

        if(userIdentified){
            if(roomId){
                console.log('Joining room....')
                joinRoom(client);
    
            }
            else{
                console.log('Creating room....')
                createRoom(client);
            }
        }

    },[userIdentified]);

    function startMatch(){
        room.send('all_in');
    }
    function selectCard(coord) {

        room.send('select_card', coord);
    }

    function addRow(){

        room.send('add_row');
    }

    function endGame(){
        room.send('quit');
    }


    if(players){
        // console.log('Players: ',players);

        // board.forEach(cell=>console.log('Selected: ', cell.selected));
    }

    return (
        <div>
        { !userIdentified
            ? <GuestIdForm addGuest={addGuest}/>
            : <GameContext.Provider value={
                {
                    game,
                    mode,
                    board,
                    deck, 
                    players:players, 
                    currentPlayer, 
                    room,
                    startMatch, 
                    selectCard,
                    addRow, 
                    endGame
                }
                }>
                { startGame ? <Game /> : <Lobby/>}
            </GameContext.Provider>
        }
        </div>
    )    
}


export default GameRoom;

/*


   --- Single Player

        --- Create & Join -> Get Room
        --- Pass Game to Game Class

   --- Multiplayer
        --- CreateJoin/Join -> Get Room
        --- Pass Game to Game Class



    Process -- 

        -- Enter room
            -- create or join
            -- variables are saved- which ones?
                -- room callbacks established, which means states must be updated
                -- players & board

            game-> passed to game variable

        





*/