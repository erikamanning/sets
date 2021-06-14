import './App.css';
import React from 'react'
import Navigation from './Components/Navigation'
import {BrowserRouter} from "react-router-dom"
import Router from './Components/Router'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Navigation/>
          <Router/>

      </div>
    </BrowserRouter>

  );
}

export default App;
