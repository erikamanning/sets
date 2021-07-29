import React, { useState } from "react"
import { useSelector } from "react-redux"

const GameRoom = ({room}) => {


    const user = useSelector(state=>state.user);

    const [userIdentified, setUserIdentified] = useState(false);
    const [guestId, setGuestId] = useState(false);
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

        setGame(room.state);
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

        <h1>Game Room</h1>
        {/* { !userIdentified
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
                { startGame && room ? <Game /> : <Lobby/>}
            </GameContext.Provider>
        } */}
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