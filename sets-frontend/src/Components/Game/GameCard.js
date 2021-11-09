import React, { useState } from "react"
import './GameCard.css';

// circle
import circleGreenEmpty from '../../Assets/circle_green_empty.png'
import circleGreenSolid from '../../Assets/circle_green_solid.png'
import circleGreenStriped from '../../Assets/circle_green_striped.png'
import circlePinkEmpty from '../../Assets/circle_pink_empty.png'
import circlePinkSolid from '../../Assets/circle_pink_solid.png'
import circlePinkStriped from '../../Assets/circle_pink_striped.png'
import circlePurpleEmpty from '../../Assets/circle_purple_empty.png'
import circlePurpleSolid from '../../Assets/circle_purple_solid.png'
import circlePurpleStriped from '../../Assets/circle_purple_striped.png'

// square
import squareGreenEmpty from '../../Assets/square_green_empty.png'
import squareGreenSolid from '../../Assets/square_green_solid.png'
import squareGreenStriped from '../../Assets/square_green_striped.png'
import squarePinkEmpty from '../../Assets/square_pink_empty.png'
import squarePinkSolid from '../../Assets/square_pink_solid.png'
import squarePinkStriped from '../../Assets/square_pink_striped.png'
import squarePurpleEmpty from '../../Assets/square_purple_empty.png'
import squarePurpleSolid from '../../Assets/square_purple_solid.png'
import squarePurpleStriped from '../../Assets/square_purple_striped.png'

// triangle
import triangleGreenEmpty from '../../Assets/triangle_green_empty.png'
import triangleGreenSolid from '../../Assets/triangle_green_solid.png'
import triangleGreenStriped from '../../Assets/triangle_green_striped.png'
import trianglePinkEmpty from '../../Assets/triangle_pink_empty.png'
import trianglePinkSolid from '../../Assets/triangle_pink_solid.png'
import trianglePinkStriped from '../../Assets/triangle_pink_striped.png'
import trianglePurpleEmpty from '../../Assets/triangle_purple_empty.png'
import trianglePurpleSolid from '../../Assets/triangle_purple_solid.png'
import trianglePurpleStriped from '../../Assets/triangle_purple_striped.png'

const GameCard = ({coord, card, cardIsSelected,selectCard}) => {

    // const [selected, setSelected] = useState(cardIsSelected);
    const printedShapes = new Array(card.numShapes).fill(0);
    const [highlightClass, setHighlightClass] = useState('border-light');
    // console.log('CARD: ', card);
    // console.log('SELECTED: ', cardIsSelected);

    const imgSrcs = {

        "circleGreenEmpty":circleGreenEmpty,
        "circleGreenSolid":circleGreenSolid,
        "circleGreenStriped":circleGreenStriped,
        "circlePinkEmpty":circlePinkEmpty,
        "circlePinkSolid":circlePinkSolid,
        "circlePinkStriped":circlePinkStriped,
        "circlePurpleEmpty":circlePurpleEmpty,
        "circlePurpleSolid":circlePurpleSolid,
        "circlePurpleStriped":circlePurpleStriped,

        "squareGreenEmpty":squareGreenEmpty,
        "squareGreenSolid":squareGreenSolid,
        "squareGreenStriped":squareGreenStriped,
        "squarePinkEmpty":squarePinkEmpty,
        "squarePinkSolid":squarePinkSolid,
        "squarePinkStriped":squarePinkStriped,
        "squarePurpleEmpty":squarePurpleEmpty,
        "squarePurpleSolid":squarePurpleSolid,
        "squarePurpleStriped":squarePurpleStriped,

        "triangleGreenEmpty":triangleGreenEmpty,
        "triangleGreenSolid":triangleGreenSolid,
        "triangleGreenStriped":triangleGreenStriped,
        "trianglePinkEmpty":trianglePinkEmpty,
        "trianglePinkSolid":trianglePinkSolid,
        "trianglePinkStriped":trianglePinkStriped,
        "trianglePurpleEmpty":trianglePurpleEmpty,
        "trianglePurpleSolid":trianglePurpleSolid,
        "trianglePurpleStriped":trianglePurpleStriped,
    }

    const handleClick = () => {

        selectCard(coord);
    }
    const addHighlight = () =>{
        setHighlightClass(hc=>'border-success');
    }
    const removeHighlight = () =>{
        setHighlightClass(hc=>'border-light');
    }

    const capitalizedColor = card.color.charAt(0).toUpperCase() + card.color.slice(1);
    const capitalizedFillLevel = card.fillLevel.charAt(0).toUpperCase() + card.fillLevel.slice(1);
    const imgSrc = imgSrcs[card.shape+capitalizedColor+capitalizedFillLevel];
    const isSelected = cardIsSelected ? 'border-success' : '';

return(
        <div onMouseLeave={removeHighlight} onMouseEnter={addHighlight} onClick={handleClick} className={'GameCard rounded shadow-lg border border-5 py-2 py-md-3 px-3 px-md-4 bg-light'+isSelected +" "+highlightClass}>
            <div className="row justify-content-center">
                {printedShapes.map((shape,idx)=> (<div key={idx} className="col-4 p-1"><img alt='shape' src={imgSrc} className='GameCard-shape'/></div>))}                
            </div>
        </div>
)
}

export default GameCard;