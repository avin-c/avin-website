import React from "react";

function Projects ({name}){
    const projects = [
        {
            title: "This Website",
        },
        {
            title: "Solar Airplane",
        }

    ]
    return(
        <div className="content">
            <h3 className="header">
                {name}
            </h3>
            <p>Currently under construction {":)"}</p>
        </div>

    )
}

export default Projects