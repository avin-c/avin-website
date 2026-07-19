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
import ColorSvg from "./components/svgcomponents/NavSvgs/ColorSvg";
import Button from "./components/Button";
import Logo from "./components/Logo";
import ThemeBuilder from "./components/ThemeBuilder";
import './App.css';
import Background from "./components/Background";
import BoidSimulation from "./components/BoidSimulation";
import BoidSvg from "./components/svgcomponents/BoidIcons/Boid";
import Links from "./components/Links";
function App() {
  const sectionHeaders = [
    
    {
      label: "About Me",
      idName: "about",
      icon: AboutSvg,
      component: About
    },
    {
      label: "Gallery",
      idName: "gallery",
      icon: GallerySvg,
      component: Gallery
    }, 
    {
      label: "Code Progress",
      idName: "codeprogress",
      icon: CodeProgressSvg,
      component: CodeProgress
     },
    {
      label: "Projects",
      idName: "projects",
      icon: ProjectsSvg,
      component: Projects
    }, 
    {
      label: "Contact me!",
      idName: "contact",
      icon: ContactSvg,
      component: Contacts
    },
    {
      label: "Theme Builder",
      idName: "theme",
      icon: ColorSvg,
      component: ThemeBuilder
    },
    {
      label: "Boids Simulation",
      idName: "boid",
      icon: BoidSvg,
      component: BoidSimulation
    },
    {
      label: "Links",
      idName: "links",
      icon: BoidSvg,
      component: Links
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
      
      <Home/>
      <Navbar list = {sectionHeaders}/>
      <Sidebar/>
      <Button/>
      
      

      <div className="sections">
        {sectionHeaders.map((sectionName) => {
          let Component = sectionName.component;
          return (
              <Component name = {sectionName.label} id = {sectionName.idName} seconds = {seconds}/>
          );
        })
        }  
      </div>
    </div>
  )
}

export default App