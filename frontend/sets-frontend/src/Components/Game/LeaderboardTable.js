import React from "react"
import { useEffect } from "react";
const { v4: uuidv4 } = require('uuid');

const LeaderBoardTable = ({players}) => {

    const makeTable = (players) => {

        let x=0;

        return( 
            <tbody>
                {players.map(player=>{
                    x++;
                    return (

                        <tr key={uuidv4()}>
                            <td>{x}</td>
                            <td>{player.username}</td>
                            <td>{player.count}</td>
                        </tr>
                    ) 
                })}
            </tbody>
        )

    }
    return (
        <div>

            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Rank #</th>
                    <th scope="col">player</th>
                    <th scope="col">wins</th>
                </tr>
            </thead>
            {makeTable(players)}
        
        </table>

        </div>
    )
}

export default LeaderBoardTable;