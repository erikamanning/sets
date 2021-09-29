import './App.css';
import React, {useEffect, useState} from 'react'
import Navigation from './Components/Navigation'
import {BrowserRouter} from "react-router-dom"
import Router from './Components/Router'
import {checkLoggedIn, getLocalStorage, clearCurrentUser} from './localStorage/helpers'
import SetsAPI from "./SetsAPI"
import UserContext from './Components/Game/UserContext'

function App() {

/**
 * 
 *  user {
 *  
 *    username,
 *    token,
 *    guestId:
 *    gameRooms:
 *          id:{
 *            sessionId:sessionId
 *          }
 * }
 * 
 * 
 */


  // console.log('LOADING APP COMPONENT');      
  document.body.classList.add('bg-light');
  const [user,setUser] = useState(false);
  const [roomIds,setRoomIds] = useState([]);

  useEffect(()=>{
    if(checkLoggedIn()){
      const {username, token} = getLocalStorage();
      // console.log('TOKEN PRESENT IN LOCAL STORAGE, user should be logged in, grab data with token & set state');
      SetsAPI.setAPIToken(token);
      setUser({username, token});
      console.log('Logged in!');
      console.log('Username: ', username);
      console.log('Token: ', token);
    }
    else{
      console.log('TOKEN NOT PRESENT IN LOCAL STORAGE');
    }
  },[]);

  const addRoomId = (roomId) => {

    console.log(`adding roomId ${roomId} to current roomIds: ${roomIds}`);
    setRoomIds(r=>([...r, roomId]));
  }

  const removeRoomId = (roomId) => {

    const previousRoomIds = roomIds;
    const newRoomIds = previousRoomIds.filter(currentId => {

      return roomId === currentId;
    });
    setRoomIds(newRoomIds);
  }

  const logout = () => {

    clearCurrentUser();
    setUser({});
  }

  return (

    <UserContext.Provider value={{user,setUser, roomIds, addRoomId, removeRoomId}}>
      <div className='bg-light text-dark pb-5'>
        <BrowserRouter>
            <div className="App">
              <Navigation logout={logout}/>
              <Router/>
          </div>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
