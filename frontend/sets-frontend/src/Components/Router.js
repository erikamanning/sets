import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Home from "./Home"
import LoginForm from './Forms/LoginForm'
import SignupForm from './Forms/SignupForm'
import UserProfile from './User/UserProfile'
import GameRoom from "./Game/GameRoom"
import SetupMultiplayer from './Game/SetupMultiplayer'

const Router = () => {

    return <div>
            <Switch>

                <Route exact path='/home'>
                    <Home />
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
                <Route exact path='/single'>
                    <h1>Single Player Mode</h1>
                </Route>
                <Route exact path='/multiplayer'>
                    <SetupMultiplayer />
                </Route>
                <Route exact path='/join/:roomId'>
                    <SetupMultiplayer />
                </Route>
                <Route exact path='/lobby/:roomId'>
                    <GameRoom mode='sets_multiplayer'/>
                </Route>

                <Redirect to="/" />

            </Switch>

    </div>

}

export default Router;