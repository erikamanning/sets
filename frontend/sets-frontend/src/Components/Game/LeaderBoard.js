import React from "react"
import { useEffect } from "react";
import LeaderBoardTable from "./LeaderboardTable"

const LeaderBoard = () => {


    useEffect(()=>{
        console.log('getting all games....')

    },[]);


    return (
        <div className='mt-5'>
            <h1>Leaderboard</h1>

            <LeaderBoardTable />

        </div>
    )
}

export default LeaderBoard;