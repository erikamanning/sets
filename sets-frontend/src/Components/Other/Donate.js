import React from "react"
import DonateForm from './DonateForm'

const Donate = () => {
    return (
        <div className='row justify-content-center'>
            <h1 className='mt-5 display-1'>Donate</h1>

            <div className="col-12 col-md-4 mt-5">
                <DonateForm/>
            </div>
        </div>
    )
}

export default Donate;
