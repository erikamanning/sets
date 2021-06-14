import {LOGIN} from './actions/actionTypes'
const INITIAL_STATE = {user:{username: 'gandalf'}};


const userReducer = (state=INITIAL_STATE, action)=>{

    switch(action.type){

        case LOGIN:
            return {...state, user:action.payload}
        
        default:
            return state;
    }
}

export default userReducer;