
import React, {useContext} from "react"
import GameContext from './GameContext'
import LobbyPlayerList from './LobbyPlayerList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faCopy } from '@fortawesome/free-solid-svg-icons'
import CountDownTimer from './CountDownTimer'

const Lobby = () => {

    const {room, readyUp, unReady, user, players, game} = useContext(GameContext);
    const roomLink = `localhost:3000/join/${room.id}`;


    function showMultiplayerLobby(){
        return (
            <div>
                {
                    room.id 
                    ?   <div className='row justify-content-center'>
                            <div className='col-12 col-md-4 col-lg-2'>
                                <p><b>Room Id: </b> {room.id}</p>
                                <div className='input-group mb-3'>
                                    <input className='form-control' type="text" value={roomLink} />
                                    <button onClick={()=>{navigator.clipboard.writeText(roomLink)}} className='btn btn-secondary'><FontAwesomeIcon icon={faCopy}/></button>
                                </div>
                            </div>
                        </div>
                    : null
                }
                <LobbyPlayerList/>
        
                {/* { console.log('# of players : ', players) } */}
        
                <div>
                    {
                        players.get(user.sessionId) &&  players.get(user.sessionId).ready && players.size < 2
                        ? <p className='text-info'><small>Multiplayer mode requires at least 2 players!</small></p>
                        : null
                    }
                </div>
        
                <div>
                    {
                         players.get(user.sessionId) &&  players.get(user.sessionId).ready && !game.allReady
                        ? <p className='text-secondary fst-italic'><small>Waiting on other players...</small></p>
                        : null
                    }
                </div>
            </div>
        )
    }

    // console.log('game mode: ', game.mode);

    return <div>

        <h1 className='my-5'>Lobby</h1>

        <h5>Welcome, <u className='text-info'>{user.username}</u>!</h5>

        {
            game && game.mode===`multiplayer`
            ? showMultiplayerLobby()
            : null
        }

        {/* {console.log('game.allReady: ', game.allReady)} */}

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