const setLocalStorage = (username,token, roomIds) => {

    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    if(roomIds)
        localStorage.setItem("roomIds", roomIds);
}


const getLocalStorage = () => {

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token" );
    const roomIds = localStorage.getItem("roomIds" );

    // console.log('localstorage username: ', username);
    // console.log('localstorage token: ', token);

    return {username,token, roomIds}
}

const addRoomIdLocalStorage = (roomId) => {
    const previousRoomIds = JSON.parse(localStorage.getItem("roomIds" )) || [];
    const currentRoomIds = [...previousRoomIds, roomId];
    localStorage.setItem('roomIds', JSON.stringify(currentRoomIds));
}

/**
 * 
 * function removes roomId from local storage, no error or issue if array is empty or if roomid not found
 */
const removeRoomIdLocalStorage = (roomId) => {
    const previousRoomIds = JSON.parse(localStorage.getItem("roomIds" )) || [];

    const newRoomIds = previousRoomIds.filter(currentId => {
        return roomId !== currentId;
    });

    localStorage.setItem('roomIds', JSON.stringify(newRoomIds));
}

const getRoomIdsLocalStorage = () =>{

    return JSON.parse(localStorage.getItem('roomIds')) || [];
}

// test data to be checked in react functions
// addRoomIdLocalStorage('charlie');
// addRoomIdLocalStorage('tango');
// addRoomIdLocalStorage('foxtrot');

const checkLoggedIn = () => {
    const token = localStorage.getItem("token");

    if(token !== null)
        return true;
    
    return false;
}

const setCurrentUser = (data)=>{
    localStorage.setItem("username", data.username);
    localStorage.setItem("token", data.token);
}

const clearCurrentUser = ()=>{
    localStorage.removeItem("username");
    localStorage.removeItem("token");
}


export {checkLoggedIn, setCurrentUser, clearCurrentUser, getLocalStorage,setLocalStorage, addRoomIdLocalStorage, removeRoomIdLocalStorage, getRoomIdsLocalStorage};