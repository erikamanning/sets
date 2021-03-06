import React, { useState} from "react"

const RoomIdForm = ({handleJoin}) => {

    const INITIAL_FORM = {
        roomCode:'',
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
        handleJoin(formData.roomCode);
        setFormData(INITIAL_FORM);
    }

    return (
        <div className="row justify-content-center">
        <div className="col-12 col-lg-3">
            <form onSubmit={handleSubmit} action='/lobby'>
                <div className="my-3">
                    <label htmlFor="roomCode" className="form-label fst-italic text-primary fw-bold">Enter room code here:</label>
                    <input name='roomCode' type="text" value={formData.roomCode} onChange={handleChange} className="form-control text-center" id="roomCode" aria-describedby="roomCode" required/>
                </div>
                <button type="submit" className="btn btn-lg btn-primary text-light">Join</button>
            </form>
        </div>
    </div>
            )

}


export default RoomIdForm;