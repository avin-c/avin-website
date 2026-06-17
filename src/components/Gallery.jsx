import React from "react";

function Gallery ({name}) {

    const galleryImages = [
        {
            name: "hello"
        }
    ]

    return(
        <div className = "content"> 
            <h3 className="header">{name}</h3>
            <p>Currently under construction :{")"}</p>
        </div>
    );
}

export default Gallery