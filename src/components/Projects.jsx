import React from "react";
import ProjectFolder from "./ProjectFolder";
import ProjectNav from "./ProjectNav";
import { useState } from "react";
import rcairplane from "../assets/rcairplane.jpg"
import mywebsite from "../assets/mywebsite.gif"
function Projects ({name, id, websiteSeconds}){
    const [currentTab, setTab] = useState(0);

    const projectsList = [
        {
            index: 0,
            hours: hoursAppend(websiteSeconds),
            link: "https://avin-c.github.io/avin-website",
            description: "Learning React for the first time so I decided to make this website! Take a look around and explore! It will continously be a work in progress so feel free to suggest any features or changes.",
            projectName: "This Website!", 
            image: mywebsite
        },
        {
            index: 1,
            hours: 20,
            link: "",
            description: "A cardboard plane powered by solar panels attached to the wings. Didn't fly too well but did learn a ton about RC plane electronics. Plan on making a better version in the future, using foam and 3d printed parts.",
            projectName: "Cardboard RC Airplane",
            image: rcairplane
        }
    ]

    const currentProject = projectsList.find(project => project.index === currentTab);

    function hoursAppend(seconds){
        const minutes = Math.floor(seconds/60);
        const hours = Math.floor(minutes/60);
        const remainingMinutes = minutes - (hours * 60);
        return hours + "h ";
        
    }
    console.log("website seconds" + websiteSeconds);
    return(
        <div className="content" id = {id}>
            <h3 className="header">
                {name}
            </h3>
            <ProjectNav list = {projectsList} currentTab = {currentTab} onselect = {setTab}/>
            <ProjectFolder 
                hours = {currentProject.hours}
                link = {currentProject.link}
                description = {currentProject.description}
                projectName = {currentProject.projectName}
                image = {currentProject.image}
            />
        </div>

    )
}

export default Projects