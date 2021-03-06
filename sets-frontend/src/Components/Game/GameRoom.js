import React, { useEffect, useState, useContext } from "react"
import {useHistory} from "react-router-dom"
import Game from './Game'
import Lobby from './Lobby'
import GameContext from './GameContext'
import UserContext from './UserContext'

const GameRoom = ({room, username,mode}) => {

    const history = useHistory();
    const [game, setGame] = useState(mode);
    const [deck, setDeck] = useState(false);
    const [players, setPlayers] = useState(new Map());
    const [startGame, setStartGame] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(false);
    const [stateChanged, setStateChanged] = useState(false);
    const [board,setBoard] = useState(false);
    const [scoreboard,setScoreboard] = useState(false);
    const [roomSetup, setRoomSetup] = useState(false);
    const [viewResult, setViewResult] = useState(false);
    const {roomIds, addRoomId, removeRoomId} = useContext(UserContext); 


    function setUpGame(room, username){

        setGame(room.state);
        setCurrentPlayer({
            username: username,
            sessionId: room.sessionId
        });
        room.state.players.onAdd = (player,key)=>{
            setPlayers((p)=>{
                let newMap = p;
                return newMap.set(key,player);
            });
        }
        room.state.players.onRemove = (player, key) => {
            setPlayers((p)=>{
                let newMap = p;
                newMap.delete(key);
                return newMap;
            });
        };

        room.onStateChange((state) => {

            if(state.started === true)
                setStartGame(true);
            if(state.finished === true)
                setGameFinished(true);
            
            setGame(room.state);
            setScoreboard(state.scoreboard);
            setBoard(state.board.grid);
            setDeck(d=>state.deck);
            setStateChanged(changed=>!changed);
        });
        room.onMessage("player_left", (message) => {
            const {playerId} = message;
            console.log("message received from server");
            alert(`${players.get(playerId).username} left!`);
            setGameFinished(true);
        });
        room.onMessage("player_quit", (message) => {
            const {playerId} = message;
            if(mode!=='singleplayer')
                alert(`${players.get(playerId).username} quit!`);

            setGameFinished(true);
        });
        room.onMessage("noSets_noCards", (message) => {
            console.log("message received from server");
            alert(`No more sets and no more cards to draw! Game over.`);
            setGameFinished(true);
        });

        room.onLeave((code) => {
            removeRoomId(room.id);
          });

        setRoomSetup(true);
    }

    useEffect(()=>{
        setUpGame(room, username);
    },[]);

    function startMatch(){
        room.send('start_game');
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
    function showResult(){
        setViewResult(true);
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
                    unReady,
                    showResult,
                    viewResult,
                    scoreboard
                }
                }>

                { startGame ? <Game /> : <Lobby/>}
            </GameContext.Provider>
        }
        </div>
    )    
}


export default GameRoom;