

import { LOGIN } from './actionTypes'
import axios from "axios"
import SetsAPI from '../../SetsAPI'

export function be_login(user) {
  return async function(dispatch) {
    const {username, password} = user;

    let token = SetsAPI.authenticate(username, password);

    dispatch(savePostDetails(token));
  };
}

function fe_login(user, token ) {
    return { type: LOGIN, payload:{user} };
}
