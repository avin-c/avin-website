import {Sprite} from "./assets/watermelon";
import { useState } from 'react';
import Home from "./components/Home";
import About from "./components/About";
import Cursor from "./components/Cursor";
import CodeProgress from "./components/CodeProgress";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Contacts from "./components/Contact";
import Navbar from "./components/Navbar";
import ContactSvg from "./components/svgcomponents/NavSvgs/ContactSvg";
import PhotoSvg from "./components/svgcomponents/NavSvgs/PhotoSvg";
import AboutSvg from "./components/svgcomponents/NavSvgs/AboutSvg";
import GallerySvg from "./components/svgcomponents/NavSvgs/GallerySvg";
import ProjectsSvg from "./components/svgcomponents/NavSvgs/ProjectsSvg";
import CodeProgressSvg from "./components/svgcomponents/NavSvgs/CodeProgressSvg";
import './App.css';
function App() {
  const sectionHeaders = [
    {
      label: "Code Progress",
      idName: "codeprogress",
      icon: CodeProgressSvg
     },
    {
      label: "About Me",
      idName: "about",
      icon: AboutSvg
    },
    {
      label: "Gallery",
      idName: "gallery",
      icon: GallerySvg
    }, 
    {
      label: "Projects",
      idName: "projects",
      icon: ProjectsSvg
    }, 
    {
      label: "Contact me!",
      idName: "contact",
      icon: ContactSvg
    }
  ];
  return (
    <div>
      <Navbar list = {sectionHeaders}/>
      <Home/>

      <div className="sections">
        <CodeProgress name = {sectionHeaders[0].label} id = {sectionHeaders[0].idName}/>
        <About name = {sectionHeaders[1].label} id = {sectionHeaders[1].idName}/>
        <Gallery name = {sectionHeaders[2].label} id = {sectionHeaders[2].idName}/>
        <Projects name =  {sectionHeaders[3].label} id =  {sectionHeaders[3].idName}/>
        <Contacts name = {sectionHeaders[4].label} id = {sectionHeaders[4].idName}/>
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