import React from "react";
const images = import.meta.glob(
    "../assets/pictures/*.JPG",
    { eager: true }
);

function Gallery ({name, id}) {
    const importedImages = Object.entries(images).map(([path, module]) => {
        const key = path.split("/").pop().split(".")[0];

        return {
            key,
            image: module.default
        };
    }); 
    console.log("imported imagessss");
    console.log(images);
    const imageData = {
        boatsunset: {
            
            name: "Boat Sunset",
            alt: "Boat in lake during sunset"
        },
        cherryblossom: {
            name: "Cherry Blossoms",
            alt: "Cherry blossom flower amongst cherry blossom tree"
        },
        chipmunk: {
            name: "Chipmunk",
            alt: "Chipmunk picture with little bit of blur"
        },
        moraine:{
            name: "Moraine Lake",
            alt: "Moraine Lake"
        },
        sunset: {
            name: "Sunset on the beach",
            alt: "Picture of sunset on a beach"
        }
    }
    const galleryImages = importedImages.map((img) => ({
        key: img.key,
        image: img.image,
        name: imageData[img.key]?.name || img.key,
        alt: imageData[img.key]?.alt || img.key
    }));    

    

    return(
        <div className = "content" id = {id}> 
            <h3 className="header">{name}</h3>
            <p>Just some cool stuff I've photographed, raw photos btw :{")"}</p>
                {galleryImages.map((item) => {
                    return (
                        <img
                            key={item.key}
                            src={item.image}
                            alt={item.alt}
                        />
                    );
                })}
        </div>
    );
}

export default Gallery