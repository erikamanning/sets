import React, {useState, useEffect, useRef} from "react"
import { SetsGame } from "../../SetsGame/SetsGame"
import GameCard from './GameCard.js'
import * as Colyseus from 'colyseus.js';

const Game = (props) => {

    // console.log('This.props: ', this.props);

    const client = new Colyseus.Client('ws://localhost:5000');
    // console.log('Colyseus Client: ', client);
    let room;
    let players={};

    client.joinOrCreate("game_room").then(room_instance => {
        room = room_instance
        console.log('******** Client Joining Room ***********');

        // room.send('select_piece');
        // room.state.players.onAdd = function (player, sessionId) {
        //     let h1 = document.createElement("h1");
        //     h1.innerText = "Player: " + sessionId;

        //     players[sessionId] = h1;
        //     document.body.appendChild(h1);
        // }
        room.onMessage("hello", (message) => {
            console.log(message);
        });


        window.addEventListener("keydown", function (e) {

            sendMessage();
        });

        function sendMessage () {
            room.send("select_piece");
        }

    });
    console.log('FE ROOM', room);
    // useEffect(()=>{

    //     async function joinGame(){
    //         await client.joinOrCreate("game_room").then(room_instance => {
    //             room = room_instance
    //             console.log('*******************');
    //             // room.state.sayHello();
    //             room.send("Hello");
        
    //         });
    //     }

    //     joinGame();

    // },[]);



    // const {
    //     children,
    //     location: { pathname },
    //   } = this.props;
    // const host = window.document.location.host.replace(/:.*/, '');

    // const client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
    // let room;

    // console.log('Colyseus client from React Front end! ', client);

    const gameRef = useRef();
    const [cardsRemaining, setCardsRemaining] = useState(81);
    const [board, setBoard] = useState({});
    const [score, setScore] = useState(null);
    const [selectedCards, setSelectedCards] = useState({});
    
    useEffect(()=>{

        gameRef.current = new SetsGame();
        setScore(gameRef.current.player.score);
        console.log('Object.keys(gameRef.current.deck.cards).length: ', Object.keys(gameRef.current.deck.cards).length);
        setBoard(gameRef.current.board);
        setScore(gameRef.current.player.score);
        setCardsRemaining(Object.keys(gameRef.current.deck.cards).length);

    },[]);

    useEffect(()=>{

        if(Object.keys(selectedCards).length===3){

            // check set
            gameRef.current.checkSet(selectedCards);

            // update score frontend
            setScore(gameRef.current.player.score);

            // update board
            setBoard(b=>gameRef.current.board);

            // clear selected cards
            setSelectedCards({});

        }

    },[selectedCards]);

    function drawThreeCards(){
        gameRef.current.addRowToBoard();
        setBoard(gameRef.current.board);
        setCardsRemaining(cr=>Object.keys(gameRef.current.deck.cards).length);
    }

    function displayBoard(){
        return  <div className='row justify-content-center'>
                    <div className="col-12 col-sm-6">
                        <div className="row">                            
                            {Object.keys(board).map((cardId) => <div key={cardId} className="col-4"><GameCard selectCard = {selectCard} card={board[cardId]}/></div>)}
                        </div>
                    </div>
                </div>
    }

    function selectCard(cardId) {

        setSelectedCards(s=>({
            ...s,
            [cardId]:board[cardId]
        }));
    }

    function updateScoreBoard(){
        setScore(gameRef.current.player.score);
    }

    console.log('RENDERING GAME...');
    
    return  <div>
                <h2>Cards left in deck: {cardsRemaining} </h2>
                <h1>Score: {score}</h1>
        
                { gameRef.current && Object.keys(gameRef.current.deck.cards).length>0 && Object.keys(board).length<15 
                    ? 
                        <button onClick={drawThreeCards} className='btn btn-primary'>
                            Draw 3 cards
                        </button> 
                    : 
                        null
                }
                { gameRef.current ? displayBoard() : null}
    </div>
    
}

export default Game;