import './App.css';
import React, {useEffect, useState} from 'react'
import Navigation from './Components/Navigation'
import {BrowserRouter} from "react-router-dom"
import Router from './Components/Router'
import {checkLoggedIn, getLocalStorage, clearCurrentUser} from './localStorage/helpers'
import {useDispatch, useSelector} from "react-redux"
import { setUser, clearUser } from './state/actions/userActions';
import SetsAPI from "./SetsAPI"

function App() {

  // console.log('LOADING APP COMPONENT');
  document.body.classList.add('bg-dark');
  const dispatch = useDispatch();


  useEffect(()=>{
    if(checkLoggedIn()){
      const {username, token} = getLocalStorage();
      // console.log('TOKEN PRESENT IN LOCAL STORAGE, user should be logged in, grab data with token & set state');
      SetsAPI.setAPIToken(token);
      dispatch(setUser(username, token));
    }
    
    else{
      // console.log('TOKEN NOT PRESENT IN LOCAL STORAGE');
    }
  },[]);

  const logout = () => {

    clearCurrentUser();
    dispatch(clearUser());
  }

  return (
    <div className='bg-dark text-light'>
      <BrowserRouter>
          <div className="App">
            <Navigation logout={logout}/>
            <Router/>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
