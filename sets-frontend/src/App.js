import './App.css';
import React, {useEffect, useState} from 'react'
import Navigation from './Components/Navigation'
import Router from './Components/Router'
import {checkLoggedIn, getLocalStorage, clearCurrentUser, addRoomIdLocalStorage, removeRoomIdLocalStorage, getRoomIdsLocalStorage} from './localStorage/helpers'
import SetsAPI from "./SetsAPI"
import UserContext from './Components/Game/UserContext'

function App() {

  document.body.classList.add('bg-light');

  const [user,setUser] = useState(false);
  const [roomIds,setRoomIds] = useState(getRoomIdsLocalStorage());

  useEffect(()=>{
    if(checkLoggedIn()){
      const {username, token} = getLocalStorage();
      SetsAPI.setAPIToken(token);
      setUser({username, token});
    }
  },[]);

  const addRoomId = (roomId) => {
    addRoomIdLocalStorage(roomId);
    setRoomIds(r=>([...r, roomId]));
  }

  const removeRoomId = (roomId) => {

    const previousRoomIds = roomIds;
    const newRoomIds = previousRoomIds.filter(currentId => {

      return roomId === currentId;
    });
    removeRoomIdLocalStorage(roomId);
    setRoomIds(newRoomIds);
  }
  const checkRoomId = (roomId)=>{
    for(let id of roomIds){
      if(roomId===id){
        return false;
      }
    }
    return true;
  }

  const logout = () => {

    clearCurrentUser();
    setUser({});
  }

  return (

    <UserContext.Provider value={{user,setUser, roomIds, addRoomId, removeRoomId,checkRoomId}}>
      <div className='bg-light text-dark pb-5'>
            <div className="App">
              <Navigation logout={logout}/>
              <Router/>
          </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
