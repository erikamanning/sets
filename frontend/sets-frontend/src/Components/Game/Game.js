import React, {useState, useEffect, useRef} from "react"
import GameBoard from './GameBoard'
import * as Colyseus from 'colyseus.js';

const Game = () => {

    const [room, setRoom] = useState(false);
    const [board,setBoard] = useState(false);
    // const [deck, setDeck] = useState(false);
    const [stateChanged, seStateChanged] = useState(false);

    let client = useRef(null); // why?

    function selectCard(coord) {

        room.send('select_card', coord);
    }

    function addRow(){

        room.send('add_row');
    }

    useEffect(()=>{

        client = new Colyseus.Client('ws://localhost:5000');
        
        client.joinOrCreate("game_room", {username: "testuser"}).then((room)=>{
            console.log('room: ', room);
            console.log('room.state.board): ', room.state.board);
            const grid = room.state.board.grid;
            setBoard(grid);

            // setDeck(deck => [...deck, room.state.deck]);
            setRoom(room);
            seStateChanged(changed=>!changed);

            console.log('******** Client Joining Room ***********');

            // at this point there is no grid yet, only the main game state
            console.log('BBB BOARD: ', room.state.board);

            room.onStateChange((state) => {
                console.log('STATE CHANGED');
                console.log(state);
                ////extract the values you want and transform into something you need
                // const grid  = room.state.board.grid;
                setBoard(state.board.grid);
                seStateChanged(changed=>!changed);

            });

        });



    },[]);


    return (
        
        <div>
            { room && board ? console.log('GAME: board: ', board) : null}

            { room && board ? <GameBoard board={board} selectCard={selectCard} addRow={addRow}/> : null }
        </div>
    )
}

export default Game;