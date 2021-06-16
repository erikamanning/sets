const setLocalStorage = (username,token) => {

    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
}


const getLocalStorage = () => {

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token" );

    console.log('localstorage username: ', username);
    console.log('localstorage token: ', token);

    return {username,token}
}

const checkLoggedIn = () => {
    const username = localStorage.getItem("username");
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