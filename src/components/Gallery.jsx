import React from "react";
import { useEffect, useRef} from "react";
const images = import.meta.glob(
    "../assets/pictures/*.JPG",
    { eager: true }
);

function Gallery ({name, id}) {
    const containerRef = useRef(null);
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
            no: 1,
            name: "Boat Sunset",
            alt: "Boat in lake during sunset"
        },
        cherryblossom: {
            no: 2,
            name: "Cherry Blossoms",
            alt: "Cherry blossom flower amongst cherry blossom tree"
        },
        chipmunk: {
            no: 3,
            name: "Chipmunk",
            alt: "Chipmunk picture with little bit of blur"
        },
        moraine:{
            no: 3,
            name: "Moraine Lake",
            alt: "Moraine Lake"
        },
        sunset: {
            no: 4,
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

    const infiniteImages = [...galleryImages, ...galleryImages, ...galleryImages];
    
    const initialMouseX = useRef(0);
    const initialScrollLeft = useRef(0);
    const isMouseDrag = useRef(false);

    const velocity = useRef(0);
    const lastX = useRef(0);
    const lastTime = useRef(0);

    const unitWidth = useRef(0);
    
    function mouseDown(e){
        console.log("scroll width" + containerRef.current.scrollWidth);
        console.log("client width" + containerRef.current.clientWidth);
        
        isMouseDrag.current = true;
        initialMouseX.current = e.clientX;
        initialScrollLeft.current = containerRef.current.scrollLeft;
        console.log("What is the containerRef.current containing?: " + containerRef.current);
        lastX.current = e.clientX;
        lastTime.current = Date.now();
        

        e.preventDefault(); 
    }
    function inertia(){

        containerRef.current.scrollLeft = containerRef.current.scrollLeft - velocity.current * 16;
        velocity.current = velocity.current * 0.9;
        console.log("Current velocity: " + velocity.current);
        if (containerRef.current.scrollLeft < unitWidth.current){
                    containerRef.current.scrollLeft = containerRef.current.scrollLeft + unitWidth.current;
                }
        if (containerRef.current.scrollLeft > 2*(unitWidth.current)){
            containerRef.current.scrollLeft = containerRef.current.scrollLeft - unitWidth.current;
        }
        if (Math.abs(velocity.current) > 0.01) {
            requestAnimationFrame(inertia);
        console.log("animation running");
        updateScroll();
    }
    }

    function updateScroll() {
        unitWidth.current = containerRef.current.scrollWidth / 3;
        // re-clamp scrollLeft in case it's now out of the safe middle range
        if (containerRef.current.scrollLeft < unitWidth.current) {
            containerRef.current.scrollLeft += unitWidth.current;
        }
        if (containerRef.current.scrollLeft > 2 * unitWidth.current) {
            containerRef.current.scrollLeft -= unitWidth.current;
        }
    }
    
    
    useEffect(() => {
        
        unitWidth.current = (containerRef.current.scrollWidth)/3;
        containerRef.current.scrollLeft = unitWidth.current;
        console.log("effectran");
        
        function handleMouseDrag(e){
            if (isMouseDrag.current == true){
                console.log("scroll width" + containerRef.current.scrollWidth);
                const dx = e.clientX - lastX.current;
                const dt = Date.now() - lastTime.current;
                velocity.current = dx/dt;
                containerRef.current.scrollLeft = initialScrollLeft.current - ((e.clientX) - (initialMouseX.current));
                console.log("scroll left"); 
                console.log(containerRef.current.scrollLeft);
                lastX.current = e.clientX;
                lastTime.current = Date.now();

                updateScroll();
            }
        }
        function mouseUp() {
            console.log("mouseup");
            isMouseDrag.current = false;
            inertia();
        }

        window.addEventListener("mousemove", handleMouseDrag);
        window.addEventListener("mouseup", mouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseDrag);
            window.removeEventListener("mouseup", mouseUp);
        };
    }, []);

    return(
        <div className = "content" id = {id}> 
            <h3 className="header">{name}</h3>
            <p>Just some cool stuff I've photographed. Lol they're not very good but i just wanted a gallery section haha</p>
                <div id = "GalleryPhotos" ref={containerRef} onMouseDown={mouseDown} >
                    {infiniteImages.map((item,index) => {
                        return (
                            <div className = "galleryitem" key={index}>
                                <img   
                                    className="image"
                                    draggable="false"
                                    src={item.image}
                                    alt={item.alt}
                                />
                            </div>
                        );
                    })}
                </div>
        </div>
    );
}

export default Gallery