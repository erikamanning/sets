import React, {useContext} from "react"
import GameBoard from './GameBoard'
import GameDashboard from './GameDashboard'
import GameContext from './GameContext'

const GameScoreTable = () => {

    const {players} = useContext(GameContext);
    // console.log('PLAYERS: ', players);


    const sortPlayersByScore = () => {

        // bubble sorting for now
        let tempKey;
        let pKeys = Object.keys(players);
        // console.log('pKeys: ', typeof(pKeys));
        for(let i = 0; i < pKeys.length-1; i++){

            // console.log('pKeys[i]: ', players[pKeys[i+1]]);
            for(let j = 0; j < pKeys.length-1; j++){

                if(players[pKeys[j]].score < players[pKeys[j+1]].score){
                    console.log('j: ', j);
                    console.log('pKey[j]: ',pKeys[j],' Player: ',players[pKeys[j]].username , " Score: ",players[pKeys[j]].score );
                    console.log('pKey[j+1]: ',pKeys[j+1],' Player: ',players[pKeys[j+1]].username , " Score: ",players[pKeys[j+1]].score );
                    tempKey=[pKeys[j]];
                    pKeys[j]=pKeys[j+1];
                    pKeys[j+1]=tempKey;
                    console.log('pKey[j]: ',pKeys[j],' Player: ',players[pKeys[j]].username , " Score: ",players[pKeys[j]].score );
                    console.log('pKey[j+1]: ',pKeys[j+1],' Player: ',players[pKeys[j+1]].username , " Score: ",players[pKeys[j+1]].score );

                }
            }
        }
        // console.log('Player order: ');
        // for(let pKey of pKeys){
        //     console.log('Player: ',players[pKey].username , "Score: ",players[pKey].score );
        // }

        return pKeys;
    }

    const makeTable = () => {

        const sortedKeys = sortPlayersByScore();
        let x=0;

        return( 
            <tbody>
                {sortedKeys.map(pKey=>{
                    x++;
                    return <tr key={pKey}>
                        {/* {console.log('pKey: ', pKey)} */}
                        {/* {console.log('players[pKey]: ', players[pKey])} */}
                        {/* {console.log('players[pKey].username: ', players[pKey].username)} */}
                        {/* {console.log('players[pKey].score: ', players[pKey].score)} */}
                        <td>{x}</td>
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