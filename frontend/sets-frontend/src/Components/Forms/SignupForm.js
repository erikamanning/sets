import React, { useState,useContext} from "react"
import SetsAPI from '../../SetsAPI'
import { setLocalStorage } from '../../localStorage/helpers'
import { Redirect } from "react-router-dom"
import UserContext from '../Game/UserContext'

const SignupForm = ({title='Signup'}) => {

    const {user, setUser} = useContext(UserContext);
    console.log('user.token: ', user.token);

    const INITIAL_FORM = {
        username:'',
        password: ''
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
        alert('Signup form submitted!');
        let resp = await SetsAPI.register(formData.username,formData.password);
        if(resp){
            setLocalStorage(formData.username,resp.token);
            setUser({username:formData.username, token:resp.token });
        }
        setFormData(INITIAL_FORM);

    }
    if(user.username){
        return <Redirect to='/home' />
    }
    return (
                <div>
                    <h1>{title}</h1>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input name='username' type="text" onChange={handleChange} value={formData.username} className="form-control" id="username" aria-describedby="username"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input name='password' type="password" onChange={handleChange} value={formData.password} className="form-control" id="password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
    );
}

export default SignupForm;