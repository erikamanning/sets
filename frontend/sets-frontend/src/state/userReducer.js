import {SET_USER, CLEAR_USER} from './actions/actionTypes'
import {setCurrentUser, clearCurrentUser} from '../localStorage/helpers'

const INITIAL_STATE = {user:{}};

const userReducer = (state=INITIAL_STATE, action)=>{

    switch(action.type){

        case SET_USER:

            return {...state, user:action.payload}

        case CLEAR_USER:

            return {...state, user:{}}
        
        default:
            return state;
    }
}

export default userReducer;