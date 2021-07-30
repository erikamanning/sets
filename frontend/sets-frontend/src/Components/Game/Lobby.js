
import React, {useContext, useState} from "react"
import GameContext from './GameContext'
import LobbyPlayerList from './LobbyPlayerList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import CountDownTimer from './CountDownTimer'

const Lobby = () => {

    const {room,startMatch, readyUp, unReady, user, players, game} = useContext(GameContext);

    const [startTimer, setStartTimer] = useState(false);

    return <div>

        <h1 className='my-5'>Lobby</h1>

        <h5>Welcome, <u className='text-info'>{user.username}</u>!</h5>

        {
            room.id 
            ? <p><b>Room Id: </b> {room.id}</p>
            : null
        }
        <LobbyPlayerList/>

        <div>
            {
                players[user.sessionId] && players[user.sessionId].ready && !game.allReady
                ? <p className='text-secondary fst-italic'><small>Waiting on other players...</small></p>
                : null
            }
        </div>

        {console.log('game.allReady: ', game.allReady)}

        <div>
            {
                game.allReady
                ? < CountDownTimer />
                : null
            }
        </div>

        {
            players[user.sessionId] && players[user.sessionId].ready
            ? (
                <div className='d-inline'>
                    <p className='font-monospace' >Cancel?</p>
                    <button className='btn btn-danger' onClick={unReady}><FontAwesomeIcon icon={faTimes}/></button>
                </div>
            )
            :  (
                <div className='d-inline'>
                    <p className='font-monospace' >Ready?</p>
                    <button className='btn btn-info' onClick={readyUp}><FontAwesomeIcon icon={faCheck}/></button>
                </div>
            )
        }

    </div>

}


export default Lobby;