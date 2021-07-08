import React, {useState, useEffect, useRef} from "react"
import GameBoard from './GameBoard'
import * as Colyseus from 'colyseus.js';

const Game = () => {

    const [room, setRoom] = useState(false);
    const client = new Colyseus.Client('ws://localhost:5000');
    useEffect(()=>{

        async function start(){
            await client.joinOrCreate("game_room").then(room_instance => {
                // room = room_instance
                setRoom(room_instance);
                console.log('******** Client Joining Room ***********');
            });
        }
        start();
    },[]);

    return (
        <div>
            { room ? <GameBoard room={room}/> : null }
        </div>
    )
}

export default Game;