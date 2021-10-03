import React, {useState} from "react"
import { useEffect } from "react";
import LeaderBoardTable from "./LeaderboardTable"
import SetsAPI from "../../SetsAPI"

const LeaderBoard = () => {

    const [leaderboardData, setLeaderboardData] = useState(false);

    useEffect(()=>{
        // console.log('getting all games....')
        async function getAllGames(){
            let data = await SetsAPI.getLeaderboardData();
            setLeaderboardData(data);
        }
        getAllGames();
    },[]);


    if(leaderboardData)
        // console.log('leaderboardData: ',leaderboardData);

    return (
        <div className='mt-5'>
            <h1>Leaderboard</h1>

            <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-8 col-lg-6">
                {
                    leaderboardData
                    ? <LeaderBoardTable players={leaderboardData}/>
                    : null
                }
                </div>
            </div>
        </div>
    )
}

export default LeaderBoard;