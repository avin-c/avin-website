import {Sprite} from "./assets/watermelon";
import { useState } from 'react';
import Home from "./components/Home";
import About from "./components/About";
import Cursor from "./components/Cursor";
import './App.css';
function App() {

  return (
    <div>
      <Cursor/>
      <Home/>
      <About/>
    </div>
  )
}

function Button(){
    function handleClick(){
      alert("You clicked the button");
    }
    return ( 
    <button onClick={handleClick} onFocus = {handleClick}>
      Click me
    </button>
  );
}
export default App