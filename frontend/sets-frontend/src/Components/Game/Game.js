import React, {useState, useEffect, useRef} from "react"
import { SetsGame } from "../../SetsGame/SetsGame"
import GameCard from './GameCard.js'
import * as Colyseus from 'colyseus.js';

const Game = (props) => {

    const [cardsRemaining, setCardsRemaining] = useState(81);
    const [board, setBoard] = useState({});
    const [score, setScore] = useState(null);

    const client = new Colyseus.Client('ws://localhost:5000');
    // console.log('Colyseus Client: ', client);
    let room;
    // let players={};

    useEffect(()=>{

        async function start(){
            await client.joinOrCreate("game_room").then(room_instance => {
                room = room_instance
                console.log('******** Client Joining Room ***********');
                console.log("this is the first room state!", room.state);
                console.log("this is the grid!", room.state.board);


                // room.onStateChange.once((state) => {
                //     console.log('has the error happened yet');
                //     console.log("this is the first room state!", state);
                // });

                // room.onMessage('get_board', (message)=>{
    
                    // console.log('ALERT!!!! THERE HAS BEEN A MESSAGE FROM THE SERVER!');
                    // console.log('Message: ', message);
                    // setBoard()
                    // setBoard(message);
                // });

                // window.addEventListener("keydown", function (e) {
                //     FEselectCard('1-A');
                // });
            });
        }

        start();
        if(room){
            console.log('ZE ROOM IS HERE! hERE IS SE ROOM: ', room);
        }

    },[selectedCards]);

    function FEselectCard(coord){

        room.send('select_card', coord);

    }

    const [selectedCards, setSelectedCards] = useState({});
    
    // useEffect(()=>{

    //     gameRef.current = new SetsGame();
    //     setScore(gameRef.current.player.score);
    //     console.log('Object.keys(gameRef.current.deck.cards).length: ', Object.keys(gameRef.current.deck.cards).length);
    //     setBoard(gameRef.current.board);
    //     setScore(gameRef.current.player.score);
    //     setCardsRemaining(Object.keys(gameRef.current.deck.cards).length);

    // },[]);

    // useEffect(()=>{

    //     if(Object.keys(selectedCards).length===3){

    //         // check set
    //         // gameRef.current.checkSet(selectedCards);

    //         // update score frontend
    //         // setScore(gameRef.current.player.score);

    //         // update board
    //         // setBoard(b=>gameRef.current.board);
    //         room.send("select_card", '1-A');


    //         // clear selected cards
    //         setSelectedCards({});

    //     }

    // },[selectedCards]);

    function drawThreeCards(){
        // gameRef.current.addRowToBoard();
        // setBoard(gameRef.current.board);
        // setCardsRemaining(cr=>Object.keys(gameRef.current.deck.cards).length);
    }

    function displayBoard(){
        return  <div className='row justify-content-center'>
                    <div className="col-12 col-sm-6">
                        <div className="row">
                            {console.log('HELLO FROM DISPLAY BOARD')}                            
                            {Object.keys(board).map((cell) => <div key={board[cell].card.id} className="col-4"><GameCard cardIsSelected={board[cell].selected} selectCard = {selectCard} card={board[cell].card}/></div>)}
                        </div>
                    </div>
                </div>
    }

    function selectCard(cardId) {

        console.log('card selected!: ', cardId);

        setSelectedCards(s=>({
            ...s,
            [cardId]:board[cardId]
        }));
    }

    // function updateScoreBoard(){
    //     setScore(gameRef.current.player.score);
    // }

    console.log('RENDERING GAME...');
    
    return  <div>
                <h2>Cards left in deck: {cardsRemaining} </h2>
                <h1>Score: {score}</h1>
        
                {/* { gameRef.current && Object.keys(gameRef.current.deck.cards).length>0 && Object.keys(board).length<15 
                    ? 
                        <button onClick={drawThreeCards} className='btn btn-primary'>
                            Draw 3 cards
                        </button> 
                    : 
                        null
                } */}
                { board ? displayBoard() : null}
    </div>
    
}

export default Game;