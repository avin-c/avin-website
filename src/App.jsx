import {Sprite} from "./assets/watermelon";
import { useState } from 'react';
function App() {

  return (
    <div>
      <Button/>
      <Sprite/>
      <br />
      <Home></Home>
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

function Home() {
  const name = "Avin Chiu";

  return (
    <h1 class = "title">{name}</h1>
  );
}

export default App