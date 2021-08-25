import React, {useContext} from "react"
import GameCard from './GameCard.js'
import GameContext from './GameContext'

const GameBoard = () => {
    
    const {board, selectCard} = useContext(GameContext);

    return (
                <div className='row justify-content-center'>
                    <div className="col-12 col-sm-10 col-lg-8">
                        <div className="row g-0">
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