
import React, {useContext, useState} from "react"
import GameContext from './GameContext'
import LobbyPlayerList from './LobbyPlayerList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import CountDownTimer from './CountDownTimer'

const Lobby = () => {

    const {room, readyUp, unReady, user, players, game} = useContext(GameContext);

    const [startTimer, setStartTimer] = useState(false);

    function showMultiplayerLobby(){
        return (
            <div>
                {
                    room.id 
                    ? <p><b>Room Id: </b> {room.id}</p>
                    : null
                }
                <LobbyPlayerList/>
        
                { console.log('# of players : ', Object.keys(players).length) }
        
                <div>
                    {
                        players[user.sessionId] && players[user.sessionId].ready && Object.keys(players).length < 2
                        ? <p className='text-info'><small>Multiplayer mode requires at least 2 players!</small></p>
                        : null
                    }
                </div>
        
                <div>
                    {
                        players[user.sessionId] && players[user.sessionId].ready && !game.allReady
                        ? <p className='text-secondary fst-italic'><small>Waiting on other players...</small></p>
                        : null
                    }
                </div>
            </div>
        )
    }

    console.log('game mode: ', game.mode);

    return <div>

        <h1 className='my-5'>Lobby</h1>

        <h5>Welcome, <u className='text-info'>{user.username}</u>!</h5>

        {
            game && game.mode===`multiplayer`
            ? showMultiplayerLobby()
            : null
        }

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