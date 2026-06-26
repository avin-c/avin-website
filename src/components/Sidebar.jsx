import React from "react";
import { useState } from "react";
import DropdownSvg from "./svgcomponents/DropdownSvg";
function Sidebar(){
    const [isHovered, setExpand] = useState(false);

    function handleCollapse(){
        setExpand(false);
    }
    
    function handleExpand (){
        setExpand(true);
    }
    console.log("sidebar");
    return (
        <div id = "sidebar" className={`${isHovered? "sideExpand":"sideCollapse"}`} onMouseEnter={handleExpand} >
            <div className = "sideButton" onClick={handleCollapse}>
                <DropdownSvg upDown = {isHovered} side = {48}/>
            </div>

            <h5 className="sideTitle">Fun stuff</h5>
        </div>
    );
}

export default Sidebar