import React from "react"
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
        <div className='card p-5 rounded shadow'>

            <table className="table border border-dark table-hover ">
            <thead>
                <tr className='table-primary'>
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