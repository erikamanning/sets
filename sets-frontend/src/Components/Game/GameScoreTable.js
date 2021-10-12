import React, {useContext} from "react"
import GameContext from './GameContext'

const GameScoreTable = () => {

    const { scoreboard} = useContext(GameContext);

    const sortPlayersByScore = () => {

        // bubble sorting for now
        let tempKey;

        scoreboard.forEach(p=>{console.log(p.username)})

        let pKeys = Array.from(scoreboard.keys());
        for(let i = 0; i < pKeys.length; i++){

            for(let j = 0; j < pKeys.length-i-1; j++){

                if(scoreboard.get(pKeys[j]).score < scoreboard.get(pKeys[j+1]).score){
                    tempKey=pKeys[j];
                    pKeys[j]=pKeys[j+1];
                    pKeys[j+1]=tempKey;
                }
            }
        }

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
                        <th className='text-primary' scope="col">Rank #</th>
                        <th className='text-primary' scope="col">player</th>
                        <th className='text-primary' scope="col">score</th>
                    </tr>
                </thead>
                {makeTable()}
            
            </table>
    )
}

export default GameScoreTable;