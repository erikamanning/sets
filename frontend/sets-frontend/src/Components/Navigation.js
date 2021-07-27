
import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import {NavLink, Link} from "react-router-dom"

const Navigation = ({logout}) => {

  const user = useSelector(state=>state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
          <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container-fluid">
              <a className="navbar-brand" href="/home">Sets</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" href="/single">Single Player</a>

                    {/* <NavLink className="nav-link" to="/single">
                    Single Player
                    </NavLink>                            */}
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/multi">Multiplayer</a>

                    {/* <NavLink className="nav-link" to="/multi">
                    Multiplayer
                    </NavLink>                            */}
                  </li>
                </ul>
                  {user.username
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
