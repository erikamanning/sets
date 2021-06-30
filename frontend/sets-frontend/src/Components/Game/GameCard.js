import React, { useState } from "react"
import './GameCard.css';

// circle
import circleGreenEmpty from '../../Assets/circle_green_empty.png'
import circleGreenSolid from '../../Assets/circle_green_solid.png'
import circleGreenStriped from '../../Assets/circle_green_striped.png'
import circleRedEmpty from '../../Assets/circle_red_empty.png'
import circleRedSolid from '../../Assets/circle_red_solid.png'
import circleRedStriped from '../../Assets/circle_red_striped.png'
import circlePurpleEmpty from '../../Assets/circle_purple_empty.png'
import circlePurpleSolid from '../../Assets/circle_purple_solid.png'
import circlePurpleStriped from '../../Assets/circle_purple_striped.png'

// square
import squareGreenEmpty from '../../Assets/square_green_empty.png'
import squareGreenSolid from '../../Assets/square_green_solid.png'
import squareGreenStriped from '../../Assets/square_green_striped.png'
import squareRedEmpty from '../../Assets/square_red_empty.png'
import squareRedSolid from '../../Assets/square_red_solid.png'
import squareRedStriped from '../../Assets/square_red_striped.png'
import squarePurpleEmpty from '../../Assets/square_purple_empty.png'
import squarePurpleSolid from '../../Assets/square_purple_solid.png'
import squarePurpleStriped from '../../Assets/square_purple_striped.png'

// triangle
import triangleGreenEmpty from '../../Assets/triangle_green_empty.png'
import triangleGreenSolid from '../../Assets/triangle_green_solid.png'
import triangleGreenStriped from '../../Assets/triangle_green_striped.png'
import triangleRedEmpty from '../../Assets/triangle_red_empty.png'
import triangleRedSolid from '../../Assets/triangle_red_solid.png'
import triangleRedStriped from '../../Assets/triangle_red_striped.png'
import trianglePurpleEmpty from '../../Assets/triangle_purple_empty.png'
import trianglePurpleSolid from '../../Assets/triangle_purple_solid.png'
import trianglePurpleStriped from '../../Assets/triangle_purple_striped.png'

const GameCard = ({card, selectCard}) => {

    const [selected, setSelected] = useState(false);
    const printedShapes = new Array(card.numShapes).fill(0);

    console.log('CARD: ', card);

    const imgSrcs = {

        "circleGreenEmpty":circleGreenEmpty,
        "circleGreenSolid":circleGreenSolid,
        "circleGreenStriped":circleGreenStriped,
        "circleRedEmpty":circleRedEmpty,
        "circleRedSolid":circleRedSolid,
        "circleRedStriped":circleRedStriped,
        "circlePurpleEmpty":circlePurpleEmpty,
        "circlePurpleSolid":circlePurpleSolid,
        "circlePurpleStriped":circlePurpleStriped,

        "squareGreenEmpty":squareGreenEmpty,
        "squareGreenSolid":squareGreenSolid,
        "squareGreenStriped":squareGreenStriped,
        "squareRedEmpty":squareRedEmpty,
        "squareRedSolid":squareRedSolid,
        "squareRedStriped":squareRedStriped,
        "squarePurpleEmpty":squarePurpleEmpty,
        "squarePurpleSolid":squarePurpleSolid,
        "squarePurpleStriped":squarePurpleStriped,

        "triangleGreenEmpty":triangleGreenEmpty,
        "triangleGreenSolid":triangleGreenSolid,
        "triangleGreenStriped":triangleGreenStriped,
        "triangleRedEmpty":triangleRedEmpty,
        "triangleRedSolid":triangleRedSolid,
        "triangleRedStriped":triangleRedStriped,
        "trianglePurpleEmpty":trianglePurpleEmpty,
        "trianglePurpleSolid":trianglePurpleSolid,
        "trianglePurpleStriped":trianglePurpleStriped,
    }

    const handleClick = () => {

        setSelected(true);
        selectCard(card.id);
    }

    const capitalizedColor = card.color.charAt(0).toUpperCase() + card.color.slice(1);
    const capitalizedFillLevel = card.fillLevel.charAt(0).toUpperCase() + card.fillLevel.slice(1);
    const imgSrc = imgSrcs[card.shape+capitalizedColor+capitalizedFillLevel];
    const isSelected = selected ? 'border-info' : '';

return  <div className='m-3'>
            <div onClick={handleClick} className={'card rounded shadow GameCard '+isSelected}>
                <div className="row p-5 justify-content-center">
                    {printedShapes.map((shape,idx)=> (<div key={idx} className="col-4"><img src={imgSrc} className='GameCard-shape'/></div>))}                
                </div>
            </div>
    </div>
}

export default GameCard;