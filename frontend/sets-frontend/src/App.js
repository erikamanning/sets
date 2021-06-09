import './App.css';
import React from 'react'
import Navbar from './Components/Navbar'
import Game from './Components/Game/Game'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Game />
    </div>
  );
}

export default App;
