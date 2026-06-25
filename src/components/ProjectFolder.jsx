import React from "react";

function ProjectFolder (props){
    function isRepo (){

    }
    return(
        <div className="projectfolder">
            <strong className = "projectTitle">
                <a href={props.link} >{props.projectName}</a>
            </strong>
            <div className = "folderbody">
                <img src={props.image}></img>
                <div className="bodytext">
                    <p>{props.description}</p>
                    <div className = "list">
                        <span><strong>Hours spent: </strong>{props.hours}</span> 
                        {props.link !== "" && (
                                <span><strong>Repo link: </strong><a href = {props.link}>{props.link}</a></span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectFolder