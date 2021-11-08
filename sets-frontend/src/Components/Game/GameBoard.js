import React, {useContext} from "react"
import GameCard from './GameCard.js'
import GameContext from './GameContext'
import './GameBoard.css'

const GameBoard = () => {
    
    const {board, selectCard} = useContext(GameContext);

    return (
                <div className='row justify-content-center align-items-center'>
                    <div className="col-12">
                        <div className="row g-1 justify-content-center">
                            {Array.from(board.keys()).map((cell) => { 
                                return board.get(cell).card
                                    ?  <div key={board.get(cell).card.id} className="col-4"><GameCard coord={cell} cardIsSelected={board.get(cell).selected} selectCard = {selectCard} card={board.get(cell).card}/></div> 
                                    : null
                                })
                            }
                        </div>
                    </div>
                </div>
    )
}

export default GameBoard;