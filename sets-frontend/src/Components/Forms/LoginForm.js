import React, { useState, useContext} from "react"
import SetsAPI from '../../SetsAPI'
import { setLocalStorage } from '../../localStorage/helpers'
import { Redirect } from "react-router-dom"
import UserContext from '../Game/UserContext'

const LoginForm = (props) => {

    const {user, setUser} = useContext(UserContext);

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
        let resp = await SetsAPI.authenticate(formData.username, formData.password);
        // console.log('RESP: ', resp);
        if(resp.token){
            setLocalStorage(formData.username,resp.token);
            setUser({username:formData.username, token:resp.token });
        }
        else{
            alert(`ERROR: ${resp}`);
        }
        setFormData(INITIAL_FORM);
    }

    if(user && user.username){
        return <Redirect to='/' />
    }

    return (
                <div>
                    <h1 className='my-5 display-1'>Login</h1>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 text-start">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input name='username' type="text" onChange={handleChange} value={formData.username} className="form-control" id="username" aria-describedby="username"/>
                                </div>
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input name='password' type="password" onChange={handleChange} value={formData.password} className="form-control" id="password"/>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary mt-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
    );
}

export default LoginForm;