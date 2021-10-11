import React from "react"
import {getLocalStorage} from '../../localStorage/helpers'
import SinglePlayer from "./SinglePlayer";
import {getRandomIntInclusive} from './RoomHelpers'

const SinglePlayerSetup = () => {

    // check for room id url param & set context
    const { username } = getLocalStorage();
    const guest = !username ? `guest${getRandomIntInclusive(1000,9999)}` : false;

    return (
        <div>
                <h1 className='mt-5 display-5'>Single Player Mode</h1>
                <SinglePlayer username={username || guest }/>
        </div>
    )
}

export default SinglePlayerSetup;