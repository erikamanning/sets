import React from "react"
import {Route} from "react-router-dom"
import Home from "./Home"
import Game from './Game/Game'
import LoginForm from './Forms/LoginForm'
import SignupForm from './Forms/SignupForm'
import UserProfile from './User/UserProfile'
const Router = () => {


    return <div>
        <Route exact path='/home'>
            <Home />
        </Route>
        <Route exact path='/play'>
            <Game />
        </Route>
        <Route exact path='/login'>
            <LoginForm />
        </Route>
        <Route exact path='/signup'>
            <SignupForm />
        </Route>
        <Route exact path='/profile'>
            <UserProfile />
        </Route>
    </div>

}

export default Router;