import './App.css';
import React from 'react'
import Navigation from './Components/Navigation'
import {BrowserRouter} from "react-router-dom"
import Router from './Components/Router'
import {useSelector} from 'react-redux'

function App() {

  const user = useSelector(state=>state.user);

  console.log('APP=> User: ', user);

  return (
    <BrowserRouter>
        {console.log()}
        <div className="App">
          <Navigation/>
          <Router/>

      </div>
    </BrowserRouter>

  );
}

export default App;
