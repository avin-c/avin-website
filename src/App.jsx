import {Sprite} from "./assets/watermelon";
import { useState ,useEffect } from 'react';
import Home from "./components/Home";
import About from "./components/About";
import Cursor from "./components/Cursor";
import CodeProgress from "./components/CodeProgress";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Contacts from "./components/Contact";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ContactSvg from "./components/svgcomponents/NavSvgs/ContactSvg";
import PhotoSvg from "./components/svgcomponents/NavSvgs/PhotoSvg";
import AboutSvg from "./components/svgcomponents/NavSvgs/AboutSvg";
import GallerySvg from "./components/svgcomponents/NavSvgs/GallerySvg";
import ProjectsSvg from "./components/svgcomponents/NavSvgs/ProjectsSvg";
import CodeProgressSvg from "./components/svgcomponents/NavSvgs/CodeProgressSvg";
import Button from "./components/Button";
import './App.css';
function App() {
  const sectionHeaders = [
    
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
      label: "Code Progress",
      idName: "codeprogress",
      icon: CodeProgressSvg
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
  const [seconds, setSeconds] = useState(35*3600);
      
  useEffect(() => {
      let timeoutId;

      const loop = async () => {
        try {
            const res = await fetch("https://hackatime.hackclub.com/api/v1/users/freshshrimp/project/avin-website");

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            
            const data = await res.json();
            console.log("Fetched data:", data);
            setSeconds(data.total_seconds);
        } catch (error) {
            console.error("Failed to fetch coding progress:", error);
        } finally {
            // 3. This 'finally' block ensures that even if the fetch fails, 
            // the loop tries again later. Increased to 30 seconds (30000ms).
            timeoutId = setTimeout(loop, 30000); 
        }
      };

      loop();

      return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div>
      <Navbar list = {sectionHeaders}/>
      <Home/>
      <Button/>
      <Sidebar/>

      <div className="sections">
        <About name = {sectionHeaders[0].label} id = {sectionHeaders[0].idName} />
        <Gallery name = {sectionHeaders[1].label} id = {sectionHeaders[1].idName}/>
        <CodeProgress name = {sectionHeaders[2].label} id = {sectionHeaders[2].idName} seconds = {seconds}/>
        <Projects name =  {sectionHeaders[3].label} id =  {sectionHeaders[3].idName} websiteSeconds={seconds}/>
        <Contacts name = {sectionHeaders[4].label} id = {sectionHeaders[4].idName}/>
      </div>
    </div>
  )
}

export default App