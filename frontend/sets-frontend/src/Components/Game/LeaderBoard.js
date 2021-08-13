import React, {useState} from "react"
import { useEffect } from "react";
import LeaderBoardTable from "./LeaderboardTable"
import SetsAPI from "../../SetsAPI"

const LeaderBoard = () => {

    const [leaderboardData, setLeaderboardData] = useState(false);

    useEffect(()=>{
        console.log('getting all games....')
        async function getAllGames(){
            let data = await SetsAPI.getLeaderboardData();
            setLeaderboardData(data);
        }
        getAllGames();
    },[]);


    if(leaderboardData)
        console.log('leaderboardData: ',leaderboardData);

    return (
        <div className='mt-5'>
            <h1>Leaderboard</h1>

            {
                leaderboardData
                ? <LeaderBoardTable players={leaderboardData}/>
                : null
            }

        </div>
    )
}

export default LeaderBoard;