import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Home from "./Home"
import Game from './Game/Game'
import LoginForm from './Forms/LoginForm'
import SignupForm from './Forms/SignupForm'
import UserProfile from './User/UserProfile'
import CreateOrJoin from "./Game/CreateOrJoin"
import GameRoom from "./Game/GameRoom"
import Join from "./Game/Join"
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
                    <GameRoom mode='sets_singleplayer'/>
                </Route>
                <Route exact path='/multi'>
                    <CreateOrJoin />
                </Route>
                <Route exact path='/create'>
                    <GameRoom mode='sets_multiplayer' />
                </Route>
                <Route exact path='/join'>
                    <Join />
                </Route>
                <Route exact path='/lobby/:roomId'>
                    <GameRoom mode='sets_multiplayer'/>
                </Route>

                <Redirect to="/" />

            </Switch>

    </div>

}

export default Router;