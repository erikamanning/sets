import React, {useState, useEffect, useRef} from "react"
import GameCard from './GameCard.js'
import * as Colyseus from 'colyseus.js';

const GameBoard = ({board, selectCard}) => {
    
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