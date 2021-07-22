
import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import {NavLink, Link} from "react-router-dom"

const Navigation = ({logout}) => {

  const user = useSelector(state=>state.user);

  // console.log('NAVIGATION: USER: ', user);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/home">Sets</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/single">
                    Single Player
                    </NavLink>                           
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/multi">
                    Multiplayer
                    </NavLink>                           
                  </li>
                </ul>
                  {user.username
                        ? 
                        <ul className='navbar-nav'>
                          <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                              Hello, {user.username}
                            </NavLink>                           
                          </li>
                          <li className="nav-item">

                            <NavLink className="nav-link" to="/home" onClick={logout}>
                              Logout
                            </NavLink>  
                            {/* <a href="/home" className="nav-link" onClick={logout}>Logout</a> */}
                          </li>                                
                        </ul>

                        :
                        <ul>
                          <li className="nav-item">
                          <NavLink className="nav-link" to="/login">
                              Login
                            </NavLink>
                          </li>
                          <li className="nav-item me-2">
                            <NavLink className="nav-link" to="/signup">
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
