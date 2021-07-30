
import React, {useState} from "react"
import GameContext from './GameContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
const LobbyPlayerListItem = ({player}) => {

    return (

        <li class="list-group-item d-flex justify-content-between align-items-center">
            {player.username}
            {
                player.ready
                ? <span class="badge bg-success rounded-pill"><FontAwesomeIcon icon={faCheck}/></span>
                : <span class="badge bg-danger rounded-pill"><FontAwesomeIcon icon={faTimes}/></span>
            }
            
        </li>
    )
}


export default LobbyPlayerListItem;