import React from "react"

const Join = () => {

    return <div>

        <h1 className='mt-5' >Join a game!</h1>
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-lg-3">
                <form action='/lobby'>
                    <div className="mb-3">
                        <label for="roomCode" className="form-label">Enter the room code here:</label>
                        <input type="text" className="form-control text-center" id="roomCode" aria-describedby="roomCode"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>

}


export default Join;