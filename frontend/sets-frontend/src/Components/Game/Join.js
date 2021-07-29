import React, { useState} from "react"
import {joinRoom} from "./RoomHelpers.js"
import GameRoom from './GameRoom'
const Join = () => {

    const INITIAL_FORM = {
        roomCode:''
    };

    const [formData,setFormData] = useState(INITIAL_FORM);
    const [room, setRoom] = useState(false);

    const handleChange = (event) =>{

        const {name,value} = event.target;

        setFormData(data=>({
            ...data,
            [name]:value
        }));
    }

    const handleSubmit = async (event) =>{

        event.preventDefault();
        const room = await joinRoom(formData.roomCode);
        if(room){
            console.log('Room successfully joined!');
            setRoom(room);
        }
        else{
            alert('Invalid room id! Please try again');
        }
        setFormData(INITIAL_FORM);

    }

    return (
            <div>
                { room 
                    ?(
                        <div>
                            <h1 className='mt-5' >Join a game!</h1>
                            <div className="row justify-content-center mt-5">
                                <div className="col-12 col-lg-3">
                                    <form onSubmit={handleSubmit} action='/lobby'>
                                        <div className="mb-3">
                                            <label htmlFor="roomCode" className="form-label">Enter the room code here:</label>
                                            <input name='roomCode' type="text" value={formData.roomCode} onChange={handleChange} className="form-control text-center" id="roomCode" aria-describedby="roomCode" required/>
                                        </div>
                                        <button type="submit" className="btn btn-info text-light">Submit!</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                    :(
                        
                        <div>
                            {console.log('room exists')}
                            <GameRoom room={room} mode='sets_multiplayer'/>
                        </div>
                    )
                }


            </div>
            )

}


export default Join;