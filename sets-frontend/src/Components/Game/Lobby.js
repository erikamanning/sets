
import React, {useContext} from "react"
import GameContext from './GameContext'
import LobbyPlayerList from './LobbyPlayerList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faCopy } from '@fortawesome/free-solid-svg-icons'
import CountDownTimer from './CountDownTimer'
import './Lobby.css'

const Lobby = () => {

    const {room, readyUp, unReady, user, players, game} = useContext(GameContext);
    const roomLink = `localhost:3000/join/${room.id}`;


    function showMultiplayerLobby(){
        return (
            <div>
                {
                    room.id 
                    ?   <div className='row justify-content-center mt-5'>
                            <div className='col-10 col-lg-8 col-xl-6'>
                                <h5 className='text-start'>Room Id:</h5>
                                <input className='form-control text-center' type="text" value={room.id} />

                                <h5 className='text-start mt-4'>Shareable Link:</h5>
                                <div className='input-group'>
                                    <input className='form-control text-center' type="text" value={roomLink} />
                                    <button onClick={()=>{navigator.clipboard.writeText(roomLink)}} className='btn btn-primary'><FontAwesomeIcon icon={faCopy}/></button>
                                </div>

                            </div>
                        </div>
                    : null
                }
                <div className='row justify-content-center mt-4'>
                    <div className='col-10 col-lg-8 col-xl-6'>
                        <LobbyPlayerList/>
                    </div>
                </div>
        
                {/* { console.log('# of players : ', players) } */}
        
                <div>
                    {
                        players.get(user.sessionId) &&  players.get(user.sessionId).ready && players.size < 2
                        ? <h5 className='text-success Lobby-multiplayer-message'><small>Multiplayer mode requires at least 2 players!</small></h5>
                        : null
                    }
                </div>
        
                <div>
                    {
                         players.get(user.sessionId) &&  players.get(user.sessionId).ready && !game.allReady
                        ? <p className='text-primary fst-italic'><small>Waiting on other players...</small></p>
                        : null
                    }
                </div>
            </div>
        )
    }

    // console.log('game mode: ', game.mode);

    return (

        <div className="container">
            <div className='row justify-content-center mt-5'>

                <div className="col-12 col-md-8 border border-primary border-5 rounded p-5 shadow-lg">
                    <h1 className='my-5 display-1'>Lobby</h1>

                    <h3>Welcome, <u className='text-primary Lobby-username'>{user.username}</u>!</h3>

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
                        
                    {console.log(`$$$$$$$ player: ${user.sessionId}`, players.get(user.sessionId))}

                    {

                        players.get(user.sessionId) && players.get(user.sessionId).ready
                        ? (
                            <div className='d-inline'>
                                <h3 className='mt-5' >Cancel?</h3>
                                <button className='Lobby-red-button mt-3' onClick={unReady}><FontAwesomeIcon icon={faTimes}/></button>
                            </div>
                        )
                        :  (
                            <div className='d-inline'>
                                <h3 className='mt-5' >Ready?</h3>
                                <button className='Lobby-green-button mt-3' onClick={readyUp}><FontAwesomeIcon icon={faCheck}/></button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>

    ) 

}


export default Lobby;