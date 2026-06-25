import React from "react";
import ProjectFolder from "./ProjectFolder";
import ProjectNav from "./ProjectNav";
import { useState } from "react";
function Projects ({name, id, websiteSeconds}){
    const [currentTab, setTab] = useState(0);

    const projectsList = [
        {
            index: 0,
            hours: hoursAppend(websiteSeconds),
            link: "https://avin-c.github.io/avin-website",
            description: "First time using React so I wanted to experiment by making this website",
            projectName: "This Website!", 
        },
        {
            index: 1,
            hours: 10,
            link: "https://google.ca",
            description: "lorem ispum",
            projectName: "lorem ispum"
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
            />
        </div>

    )
}

export default Projects