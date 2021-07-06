import React, {useState, useEffect, useRef} from "react"
import { SetsGame } from "../../SetsGame/SetsGame"
import GameCard from './GameCard.js'
import * as Colyseus from 'colyseus.js';

const Game = (props) => {

    const [cardsRemaining, setCardsRemaining] = useState(81);
    const [board, setBoard] = useState(new Map());
    const [score, setScore] = useState(null);
    const [feRoom, setFeRoom] = useState(null);
    const client = new Colyseus.Client('ws://localhost:5000');
    // console.log('Colyseus Client: ', client);
    let room;
    // let players={};

    useEffect(()=>{

        async function start(){
            await client.joinOrCreate("game_room").then(room_instance => {
                room = room_instance
                setFeRoom(room);
                console.log('******** Client Joining Room ***********');

                room.onStateChange((state) => {
                    console.log('has the error happened yet');
                    console.log("this is the first room state!", state.board.grid.$items.entries());
                    setBoard(state.board.grid.$items);
                });


                // window.addEventListener("keydown", function (e) {
                //     FEselectCard('1-A');
                // });
            });
        }

        start();

    },[selectedCards]);

    function FEselectCard(coord){

        feRoom.send('select_card', coord);
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
                            {Array.from(board.keys()).map((cell) => <div key={board.get(cell).card.id} className="col-4"><GameCard coord={cell} cardIsSelected={board.get(cell).selected} selectCard = {selectCard} card={board.get(cell).card}/></div>)}
                        </div>
                    </div>
                </div>
    }

    function selectCard(coord) {

        console.log('card selected!: ', coord);
        FEselectCard(coord);
        setSelectedCards(s=>({
            ...s,
            [board.get(coord).card.id]:board.get(coord).card
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