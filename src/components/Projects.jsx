import React from "react";

function Projects ({name, id}){
    const projects = [
        {
            title: "This Website",
        },
        {
            title: "Solar Airplane",
        }

    ]
    return(
        <div className="content" id = {id}>
            <h3 className="header">
                {name}
            </h3>
            <p>Currently under construction {":)"}</p>
        </div>

    )
}

export default Projects