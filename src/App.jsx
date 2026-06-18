import {Sprite} from "./assets/watermelon";
import { useState } from 'react';
import Home from "./components/Home";
import About from "./components/About";
import Cursor from "./components/Cursor";
import CodeProgress from "./components/CodeProgress";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Contacts from "./components/Contact";
import './App.css';
function App() {
  const sectionHeaders = 
    ["Code Progress", "About Me", "Gallery", "Projects", "Contact me!"];
  return (
    <div>
      <Cursor/>
      <Home/>
      <div className="sections">
        <CodeProgress name = {sectionHeaders[0]}/>
        <About name = {sectionHeaders[1]}/>
        <Gallery name = {sectionHeaders[2]}/>
        <Projects name = {sectionHeaders[3]}/>
        <Contacts name = {sectionHeaders[4]}/>
      </div>
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