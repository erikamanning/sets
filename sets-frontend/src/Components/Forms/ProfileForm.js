import React, { useContext} from "react"
import UserContext from '../Game/UserContext'
import './ProfileForm.css'

const ProfileForm = () => {

    const {user} = useContext(UserContext);

    return (
                <div>
                    <h1 className='my-5 display-1'>Profile</h1>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-4 border border-5 border-primary p-5">
                            <p className='ProfileForm-username text-primary'><span className='fw-bold'>Username: </span>{user.username}</p>
                        </div>
                    </div>
                </div>
    );
}

export default ProfileForm;