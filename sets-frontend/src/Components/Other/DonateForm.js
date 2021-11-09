import React from "react"


const DonateForm = () => {
    return (
        <div>
            <form action="" className='text-start'>

                <label for='donate-amount' className="form-label text-primary">Amount:</label>
                <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input type="text" id='donate-amount' className="form-control" aria-label="Amount (to the nearest dollar)"/>
                    <span className="input-group-text">.00</span>
                </div>


                <div className="input-group">
                    <span className="input-group-text">Message</span>
                    <textarea className="form-control" aria-label="With textarea"></textarea>
                </div>
            </form>
            
        </div>
    )
}

export default DonateForm;
