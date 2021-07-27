import React, {useContext} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'
import GameContext from './GameContext'

const GameScoreTable = () => {

    const {players} = useContext(GameContext);
    console.log('PLAYERS: ', players);


    const sortPlayersByScore = () => {

        // bubble sorting for now
        let tempKey;
        let pKeys = Object.keys(players);
        console.log('pKeys: ', typeof(pKeys));
        for(let i = 0; i < pKeys.length-1; i++){

            console.log('pKeys[i]: ', players[pKeys[i+1]]);
            
            if(players[pKeys[i]].score > players[pKeys[i+1]].score){
                tempKey=[pKeys[i]];
                pKeys[i]=pKeys[i+1];
                pKeys[i+1]=tempKey;
            }
        }

        return pKeys;
    }

    const makeTable = () => {

        const sortedKeys = sortPlayersByScore();

        return( 
            <tbody>
                {sortedKeys.map(pKey=>{

                    return <tr key={pKey}>
                        {console.log('pKey: ', pKey)}
                        {console.log('players[pKey]: ', players[pKey])}
                        {console.log('players[pKey].username: ', players[pKey].username)}
                        {console.log('players[pKey].score: ', players[pKey].score)}
                        <td>{players[pKey].playerNumber}</td>
                        <td>{players[pKey].username}</td>
                        <td>{players[pKey].score}</td>
                    </tr>
                })}
            </tbody>
        )

    }

    return (
        
        <table className="table">
        <thead>
            <tr>
                <th scope="col">Rank #</th>
                <th scope="col">username</th>
                <th scope="col">score</th>
            </tr>
        </thead>
            {makeTable()}
        
        </table>
    )
}

export default GameScoreTable;