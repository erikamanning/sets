
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import './LobbyPlayerListItem.css';

const LobbyPlayerListItem = ({player}) => {

    return (

        <li className="list-group-item d-flex justify-content-between align-items-center">
            {player.username}
            {
                player.ready
                ? <span className="badge rounded-pill LobbyPlayerListItem-green-check"><FontAwesomeIcon icon={faCheck}/></span>
                : <span className="badge bg-danger rounded-pill"><FontAwesomeIcon icon={faTimes}/></span>
            }
            
        </li>
    )
}


export default LobbyPlayerListItem;