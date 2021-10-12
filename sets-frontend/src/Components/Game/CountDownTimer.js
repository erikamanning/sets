import React, {useState, useEffect,useContext} from "react"
import GameContext from './GameContext'

const CountDownTimer = () => {

    const [count, setCount] = useState(3);
    const {startMatch} = useContext(GameContext);

    useEffect(()=>{

        let i=3;

        const clearInt = setInterval(()=>{

            i--;

            if(i<0){
                clearInterval(clearInt);
                startMatch();
            }
            else{
                setCount(c=>c-1);
            }

        },1000)

        return ()=>{clearInterval(clearInt);}

    },[]);

    return (
        <div className='mt-5'>
            {
                count>0
                ? <h1 className='display-1 d-inline bg-primary text-white py-2 px-5 rounded'>{count}</h1>
                : <h1 className='display-1 d-inline bg-primary text-white py-2 px-5 rounded'>Start!</h1>
            }
        </div>
    )
}

export default CountDownTimer;