import React from "react";

function ProjectFolder (props){
    return(
        <div className="projectfolder">
            <strong className = "projectTitle">
                <a href={props.link} >{props.projectName}</a>
            </strong>
            <p>{props.description}</p>
                <div className = "list">
                    <span><strong>Hours spent: </strong>{props.hours}</span> 
                    <span><strong>Repo link: </strong><a href = {props.link}>{props.link}</a></span>
                </div>
        </div>
    );
}

export default ProjectFolder