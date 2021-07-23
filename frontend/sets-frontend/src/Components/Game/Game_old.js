import React, {useState, useEffect, useRef} from "react"
import GameBoard from './GameBoard'
import * as Colyseus from 'colyseus.js';
import {getRandName} from "./RoomHelpers"

const Game = ({gPlayers,gBoard, gCurrentPlayer}) => {


    const [room, setRoom] = useState(false);
    const [board,setBoard] = useState(false);
    // const [deck, setDeck] = useState(false);
    const [stateChanged, seStateChanged] = useState(false);
    const [players, setPlayers] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(false);

    let client = useRef(null); // why?

    function selectCard(coord) {

        room.send('select_card', coord);
    }

    function addRow(){

        room.send('add_row');
    }

    useEffect(()=>{

        client = new Colyseus.Client('ws://localhost:5000');
        // console.log('client: ', client);
        const randName = getRandName();

        client.joinOrCreate("sets_singleplayer", {username: randName}).then((room)=>{
            // console.log('room: ', room);
            // console.log('room.state.board): ', room.state.board);

            setCurrentPlayer({
                username: randName,
                sessionId: room.sessionId
            });
            const grid = room.state.board.grid;
            setBoard(grid);

            // setDeck(deck => [...deck, room.state.deck]);
            setRoom(room);
            seStateChanged(changed=>!changed);

            console.log('******** Client Joining Room ***********');

            // at this point there is no grid yet, only the main game state
            // console.log('BBB BOARD: ', room.state.board);

            room.onStateChange((state) => {
                // console.log('STATE CHANGED');
                // console.log('changes: ',state);
                ////extract the values you want and transform into something you need
                // const grid  = room.state.board.grid;
                setBoard(state.board.grid);
                seStateChanged(changed=>!changed);

                // console.log('players: ', state.players.forEach(player=>console.log('player: ', player)));

                // room.state.players.onAdd((player,key)=>{
                //     console.log(`player ${key}: `, player.printDetails());
                // });

            });

            // console.log('room.state.players: ', room.state.players);

            room.state.players.onAdd = (player,key)=>{
                // console.log(`player ${key}: `, player);
                setPlayers(p=>({
                    [key]:player,
                    ...p
                }));
            }

        });   
        
    },[]);

    if(room){
        console.log('Room id: ', room.id);
    }

    return (
        
        <div>
            {currentPlayer? <p><b>Current Player: </b>{currentPlayer.username}</p> : null}

            {/* { room && board ? console.log('GAME: board: ', board) : null} */}

            {players
                ? Object.keys(players).map(key=> <p key={key}>Player {players[key].playerNumber}: {players[key].username}  <b>score: </b>{players[key].score}</p>)
                : null 
            }

            { room && board ? <GameBoard board={board} selectCard={selectCard} addRow={addRow}/> : null }
        </div>
    )
}

export default Game;