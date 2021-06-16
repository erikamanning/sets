

import { SET_USER, CLEAR_USER } from './actionTypes'
import SetsAPI from '../../SetsAPI'

export function authenticateUser(user) {
  return async function(dispatch) {
    const {username, password} = user;

    let resp = await SetsAPI.authenticate(username, password);
    if(resp.token){
      dispatch(setUser(username, resp.token));
    }
  };
}

export function checkToken(token) {
  return async function(dispatch) {
    // const {username, password} = user;

    // let resp = await SetsAPI.authenticate(username, password);
    // if(resp.token){
    //   dispatch(setUser(username, resp.token));
    // }
  };
}

export function setUser(username, token ) {
    return { type: SET_USER, payload:{username, token} };
}

export function clearUser() {
  return { type: CLEAR_USER , payload: null };
}
