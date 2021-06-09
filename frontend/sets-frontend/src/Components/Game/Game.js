import React, {useState, useEffect} from "react"
import { Deck } from "../../SetsGame/Deck"
import GameCard from './GameCard.js'
import { CardColumns } from "reactstrap";
const Game = () => {

    const [deck, setDeck] = useState(new Deck(["red","green","purple"], ["square","circle", "triangle"]));

    const [board, setBoard] = useState(deck.getCards(12));

    console.log("Board: ", board);

    // newDeck.shuffle();
    // newDeck.printDeck();


    return  <div className='row justify-content-center'>
        <div className="col-12 col-sm-6">
            <h1>Game!</h1>
            <div className="row">                            
                {board.map((card,idx) => <div key={idx} className="col-4"><GameCard card={card}/></div>)}
            </div>
        </div>
    </div>


}

export default Game;