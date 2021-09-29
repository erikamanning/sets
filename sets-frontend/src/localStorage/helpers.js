const setLocalStorage = (username,token, roomIds) => {

    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
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

const addRoomId = (roomId) => {
    const previousRoomIds = JSON.parse(localStorage.getItem("roomIds" )) || [];
    const currentRoomIds = [...previousRoomIds, roomId];
    localStorage.setItem('roomIds', JSON.stringify(currentRoomIds));
}

const removeRoomId = (roomId) => {
    const previousRoomIds = JSON.parse(localStorage.getItem("roomIds" ));

    const newRoomIds = previousRoomIds.filter(currentId => {

        return roomId === currentId;
    });
}

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


export {checkLoggedIn, setCurrentUser, clearCurrentUser, getLocalStorage,setLocalStorage};