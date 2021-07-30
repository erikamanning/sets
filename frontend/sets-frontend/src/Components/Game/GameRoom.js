import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {useHistory} from "react-router-dom"
import Game from './Game'
import Lobby from './Lobby'
import GameContext from './GameContext'

const GameRoom = ({room, guestUser}) => {

    const username = guestUser || useSelector(state=>state.user.username);
    const history = useHistory();
    const [guestId, setGuestId] = useState(false);
    const [game, setGame] = useState(false);
    const [deck, setDeck] = useState(false);
    const [players, setPlayers] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(false);
    const [stateChanged, seStateChanged] = useState(false);
    const [board,setBoard] = useState(false);
    const [roomSetup, setRoomSetup] = useState(false);

    function setUpGame(room, username){

        setGame(room.state);
        setCurrentPlayer({
            username: username,
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
        setRoomSetup(true);
    }

    useEffect(()=>{
        setUpGame(room);
    },[]);

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

    function leave(){
        room.leave();
        history.push('/')
    }

    function readyUp(){
        room.send('ready');
    }
    function unReady(){
        room.send('not_ready');
    }

    return (
        <div>

        { !roomSetup
            ? <h5>Setting up room...</h5>
            : <GameContext.Provider value={
                {
                    game,
                    board,
                    deck, 
                    players, 
                    user:currentPlayer, 
                    room,
                    startMatch, 
                    selectCard,
                    addRow, 
                    endGame,
                    leave,
                    readyUp,
                    unReady
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