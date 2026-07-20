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
import Footer from "./components/Footer"
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
  const [appColors, setAppColors] = useState({
    primary: "#322642",
    primarysecondary: "#433457",
    secondary: "#54426B",
    text: "#ffffff",
    darktext: "#271f32",
    accent1: "#CBDF90",
    accent2: "#F19455"
  })
      
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

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", appColors.primary);
    document.documentElement.style.setProperty("--secondary-color", appColors.secondary);
    document.documentElement.style.setProperty("--accent-color", appColors.accent1);
    document.documentElement.style.setProperty("--accent-color-color", appColors.accent2);
    document.documentElement.style.setProperty('--prisecond-color', appColors.primarysecondary); //calculate prisecond color
    document.documentElement.style.setProperty(`--dark-text-color`, appColors.darktext); //calculate dark text color by hex > rgb > hsl, lower l, hsl > rgb > hex
    document.documentElement.style.setProperty(`--text-color`, appColors.text);
  }, [appColors])
  return (
    <div>
      
      <Home/>
      <Navbar list = {sectionHeaders} iconColor = {appColors.text}/>
      <Sidebar iconColor = {appColors.text}/>
      <Button/>
      
      

      <div className="sections">
        {sectionHeaders.map((sectionName) => {
          let Component = sectionName.component;
          return (
              <Component 
                key = {sectionName.label} 
                name = {sectionName.label} 
                id = {sectionName.idName} 
                seconds = {(sectionName.idName === "codeprogress"|| sectionName.idName === "projects")? seconds : undefined} 
                appColors = {sectionName.idName === "theme" ? appColors : undefined}
                setAppColors = {sectionName.idName === "theme" ? setAppColors : undefined} 
                iconColor = {appColors.text} 
              />
          );
        })
        }  

      <Footer/>
      </div>
      
    </div>
  )
}

export default App