import React from "react"
import { useEffect } from "react";

const LeaderBoardTable = ({players}) => {

    const makeTable = (players) => {

        let x=0;

        return( 
            <tbody>
                {players.map(pKey=>{
                    x++;
                    return (

                        <tr key={pKey}>
                            <td>{x}</td>
                            <td>{players.get(pKey).username} {players.get(pKey).abandoned ? <b className='text-danger'>ABANDONED</b> : null}</td>
                            <td>{players.get(pKey).score}</td>
                        </tr>
                    ) 
                })}
            </tbody>
        )

    }
    return (
        <div>
            <h5>Leaderboard Table</h5>

            

        </div>
    )
}

export default LeaderBoardTable;