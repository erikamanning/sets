
import React, { useState,useContext } from 'react';
import {NavLink} from "react-router-dom"
import UserContext from './Game/UserContext';
const Navigation = ({logout}) => {

  const {user} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  // console.log('isOpen: ', isOpen);  

  const toggle = () => {
    
  console.log('toggle button clicked')  
    setIsOpen(io=>!io);
  };

  return (
          <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container-fluid">
              <a className="navbar-brand" href="/home">Sets</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={isOpen} aria-label="Toggle navigation" onClick={toggle}>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={`${isOpen ? '' : 'collapse'} navbar-collapse`}id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" href="/singleplayer">Single Player</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/multiplayer">
                      Multiplayer 
                    </a>
                  </li>
                </ul>
                {user && user.username
                  ? 
                  <ul className='navbar-nav mb-2 mb-lg-0'>
                    <li className="nav-item">
                      <NavLink className="nav-link active" to="/profile">
                        Hello, {user.username}
                      </NavLink>                           
                    </li>
                    <li className="nav-item">

                      <NavLink className="nav-link active" to="/home" onClick={logout}>
                        Logout
                      </NavLink>  
                      {/* <a href="/home" className="nav-link" onClick={logout}>Logout</a> */}
                    </li>                                
                  </ul>

                  :
                  <ul className='navbar-nav mb-2 mb-lg-0'>
                    <li className="nav-item">
                    <NavLink className="nav-link active" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item me-2">
                      <NavLink className="nav-link active" to="/signup">
                        Signup
                      </NavLink>     
                    </li>
                  </ul>
                }
              </div>
            </div>
          </nav>
  );
}

export default Navigation;
