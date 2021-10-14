import React, { useState,useContext, useEffect} from "react"
import SetsAPI from '../../SetsAPI'
import { setLocalStorage } from '../../localStorage/helpers'
import { Redirect } from "react-router-dom"
import UserContext from '../Game/UserContext'
import './ProfileForm.css'

const ProfileForm = () => {

    const {user, setUser} = useContext(UserContext);

    console.log('User.username: ', user.username);

    const INITIAL_FORM = {
        username: user.username,
        password: ''
    };
    const [formData,setFormData] = useState({
        username:user.username,
        password: ''
    });
    console.log('formData.username: ', formData);

    const handleChange = (event) =>{

        const {name,value} = event.target;

        setFormData(data=>({
            ...data,
            [name]:value
        }));
    }

    const handleSubmit = async (event) =>{

        event.preventDefault();
        let resp = await SetsAPI.authenticate(formData.username,formData.password);
        if(resp){
            setLocalStorage(formData.username,resp.token);
            setUser({username:formData.username, token:resp.token });
        }
        setFormData(INITIAL_FORM);

    }

    return (
                <div>
                    <h1 className='my-5 display-1'>Profile</h1>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-4 border border-5 border-primary p-5">
                            <p className='ProfileForm-username text-primary'><span className='fw-bold'>Username: </span>{user.username}</p>
                            {/* <form onSubmit={handleSubmit}>
                                <div className="mb-3 text-start">
                                    <label htmlFor="username" className="form-label text-primary">Username</label>
                                    <input name='username' type="text" onChange={handleChange} value={formData.username} className="form-control" id="username" aria-describedby="username"/>
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label text-primary">Old Password</label>
                                    <input name='password' type="password" onChange={handleChange} value={formData.password} className="form-control" id="password"/>
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label text-primary">New Password</label>
                                    <input name='password' type="password" onChange={handleChange} value={formData.password} className="form-control" id="password"/>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary mt-2">Make Changes</button>
                            </form> */}
                        </div>
                    </div>
                </div>
    );
}

export default ProfileForm;