import React, { useState} from "react"
import {useHistory} from "react-router-dom"

const Join = () => {

    const INITIAL_FORM = {
        roomCode:''
    };

    const [formData,setFormData] = useState(INITIAL_FORM);
    const history = useHistory();

    const handleChange = (event) =>{

        const {name,value} = event.target;

        setFormData(data=>({
            ...data,
            [name]:value
        }));
    }

    const handleSubmit = async (event) =>{

        event.preventDefault();
        setFormData(INITIAL_FORM);
        history.push(`/lobby/${formData.roomCode}`);
    }

    return <div>

        <h1 className='mt-5' >Join a game!</h1>
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-lg-3">
                <form onSubmit={handleSubmit} action='/lobby'>
                    <div className="mb-3">
                        <label htmlFor="roomCode" className="form-label">Enter the room code here:</label>
                        <input name='roomCode' type="text" value={formData.roomCode} onChange={handleChange} className="form-control text-center" id="roomCode" aria-describedby="roomCode"/>
                    </div>
                    <button type="submit" className="btn btn-info text-light">Submit!</button>
                </form>
            </div>
        </div>
    </div>

}


export default Join;