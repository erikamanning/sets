import React, {useContext} from "react"
import GameContext from './GameContext'

const GameScoreTable = () => {

    const {players, scoreboard} = useContext(GameContext);
    console.log('scoreboard: ');
    console.log('players: ')
    scoreboard.forEach(p=>{console.log(p.username)})
    console.log('abandoned: ')
    scoreboard.forEach(p=>{console.log(p.abandoned)})



    const sortPlayersByScore = () => {

        // bubble sorting for now
        let tempKey;
        console.log('scoreboard output check, size: ', scoreboard.size);
        console.log('scoreboard: ');
        scoreboard.forEach(p=>{console.log(p.username)})

        let pKeys = Array.from(scoreboard.keys());
        // console.log('pKeys: ', typeof(pKeys));
        for(let i = 0; i < pKeys.length; i++){

            // console.log('pKeys[i]: ', players[pKeys[i+1]]);
            for(let j = 0; j < pKeys.length-i-1; j++){

                if(scoreboard.get(pKeys[j]).score < scoreboard.get(pKeys[j+1]).score){
                    console.log('j: ', j);
                    console.log('pKey[j]: ',pKeys[j],' Player: ',scoreboard.get(pKeys[j]).username , " Score: ",scoreboard.get(pKeys[j]).score );
                    console.log('pKey[j+1]: ',pKeys[j+1],' Player: ',scoreboard.get(pKeys[j+1]).username , " Score: ",scoreboard.get(pKeys[j+1]).score );
                    tempKey=pKeys[j];
                    pKeys[j]=pKeys[j+1];
                    pKeys[j+1]=tempKey;
                    console.log('pKey[j]: ',pKeys[j],' Player: ',scoreboard.get(pKeys[j]).username , " Score: ",scoreboard.get(pKeys[j]).score );
                    console.log('pKey[j+1]: ',pKeys[j+1],' Player: ',scoreboard.get(pKeys[j+1]).username , " Score: ",scoreboard.get(pKeys[j+1]).score );
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
                // {Array.from(players.keys()).map(pKey=>{
                    x++;
                    return <tr key={pKey}>
                        {/* {console.log('pKey: ', pKey)} */}
                        {/* {console.log('players[pKey]: ', players[pKey])} */}
                        {/* {console.log('players[pKey].username: ', players[pKey].username)} */}
                        {/* {console.log('players[pKey].score: ', players[pKey].score)} */}
                        <td>{x}</td>
                        <td>{scoreboard.get(pKey).username} {scoreboard.get(pKey).abandoned ? <b className='text-danger'>ABANDONED</b> : null}</td>
                        <td>{scoreboard.get(pKey).score}</td>
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
                <th scope="col">player</th>
                <th scope="col">score</th>
            </tr>
        </thead>
            {makeTable()}
        
        </table>
    )
}

export default GameScoreTable;