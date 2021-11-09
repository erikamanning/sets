import React, {useState} from "react"
import {getLocalStorage} from '../../localStorage/helpers'
import { useParams } from "react-router";
import Multiplayer from "./Multiplayer";
import GuestIdForm from "./GuestIdForm";
import RoomContext from "./RoomContext";

const MultiplayerSetup = () => {

    // check for room id url param & set context
    const { roomId } = useParams();
    // console.log('SETUP_MULTIPLAYER-- roomId: ', roomId);
    const { username } = getLocalStorage();
    const [guest, setGuest] = useState(false);

    function addGuest(username){
        setGuest(username);
    }

    return (
        <div className='mt-4'>
            <RoomContext.Provider value={{id: roomId}}>                
                {
                    username || guest
                    ? <Multiplayer username={username || guest }/>
                    : <GuestIdForm addGuest={addGuest} />
                }
            </RoomContext.Provider>
            
        </div>
    )
}

export default MultiplayerSetup;