import React from "react"


const DonateForm = () => {
    return (
        <div>
            <form action="" className='text-start'>

                <label for='donate-amount' class="form-label text-primary">Amount:</label>
                <div class="input-group mb-3">
                    <span class="input-group-text">$</span>
                    <input type="text" id='donate-amount' class="form-control" aria-label="Amount (to the nearest dollar)"/>
                    <span class="input-group-text">.00</span>
                </div>


                <div class="input-group">
                    <span class="input-group-text">Message</span>
                    <textarea class="form-control" aria-label="With textarea"></textarea>
                </div>
            </form>
            
        </div>
    )
}

export default DonateForm;
