import React, { useState} from "react"
import './GuestIdForm.css'


const GuestIdForm = ({addGuest}) => {

    const INITIAL_FORM = {
        playerName:'',
    };

    const [formData,setFormData] = useState(INITIAL_FORM);

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
        setFormData(INITIAL_FORM);
    }

    return <div>

        <div className="row justify-content-center mt-5 mx-3">
            <div className="col-12 col-md-6 col-lg-3">
                <form className='border border-primary border-5 rounded p-5' onSubmit={handleSubmit} action='/lobby'>
                    <div className="mb-3">
                        <label htmlFor="playerName" className="form-label text-primary fw-bold GuestIdForm-label mb-3">What do we call you?</label>
                        <input name='playerName' type="text" value={formData.playername} onChange={handleChange} className="form-control text-center" id="playerName" aria-describedby="roomCode" required/>
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary text-light mt-3">Submit!</button>
                </form>
                <div className='mt-5'>
                        <p className='text-primary mb-0 fw-bold' >Already have an account?</p>
                        <p className='mt-0'><small className=' fst-italic' >Login to use username:</small></p>

                        <div>
                            <a href='/login' className='btn btn-primary d-'>Login</a>
                        </div>
                </div>
            </div>
        </div>
    </div>

}


export default GuestIdForm;