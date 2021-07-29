import React, { useState} from "react"
import {useHistory} from "react-router-dom"

const GuestIdForm = ({addGuest}) => {

    const INITIAL_FORM = {
        playerName:'',
    };

    const [formData,setFormData] = useState(INITIAL_FORM);
    // const history = useHistory();

    const handleChange = (event) =>{

        const {name,value} = event.target;

        setFormData(data=>({
            ...data,
            [name]:value
        }));
    }

    const handleSubmit = async (event) =>{

        event.preventDefault();
        addGuest(formData.playerName);
        // history.push(`/lobby/${formData.roomCode}`);
        setFormData(INITIAL_FORM);
    }

    return <div>

        <div className="row justify-content-center mt-5 mx-3">
            <div className="col-12 col-md-6 col-lg-3">
                <form onSubmit={handleSubmit} action='/lobby'>
                    <div className="mb-3">
                        <label htmlFor="playerName" className="form-label">What do we call you?</label>
                        <input name='playerName' type="text" value={formData.playername} onChange={handleChange} className="form-control text-center" id="playerName" aria-describedby="roomCode" required/>
                    </div>
                    <button type="submit" className="btn btn-info text-light">Submit!</button>
                    <div className='mt-5'>
                        <p className='text-secondary fst-italic mb-0' >Already have an account?</p>
                        <p className='mt-0'><small className=' fst-italic' >Login to use username:</small></p>

                        <div>
                            <a href='/login' className='btn btn-secondary d-'>Login</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

}


export default GuestIdForm;