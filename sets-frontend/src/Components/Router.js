import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Home from "./Home"
import LoginForm from './Forms/LoginForm'
import SignupForm from './Forms/SignupForm'
import UserProfile from './User/UserProfile'
import GameRoom from "./Game/GameRoom"
import MultiplayerSetup from './Game/MultiplayerSetup'
import SinglePlayerSetup from './Game/SinglePlayerSetup'
import Leaderboard from './Game/LeaderBoard'
import Donate from './Other/Donate'

const Router = () => {

    return <div>
            <Switch>

                <Route exact path='/'>
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
                <Route exact path='/singleplayer'>
                    <SinglePlayerSetup/>
                </Route>
                <Route exact path='/multiplayer'>
                    <MultiplayerSetup />
                </Route>
                <Route exact path='/leaderboard'>
                    <Leaderboard />
                </Route>
                <Route exact path='/donate'>
                    <Donate />
                </Route>
                <Route exact path='/join/:roomId'>
                    <MultiplayerSetup />
                </Route>
                <Route exact path='/lobby/:roomId'>
                    <GameRoom mode='sets_multiplayer'/>
                </Route>

                <Redirect to="/" />

            </Switch>

    </div>

}

export default Router;