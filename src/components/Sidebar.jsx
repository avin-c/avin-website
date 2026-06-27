import React from "react";
import { useState } from "react";
import DropdownSvg from "./svgcomponents/DropdownSvg";
import Guestbook from "./Guestbook";
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
            <div className="sidebody">
                <h5 className="sideTitle">Sign my guestbook!</h5>
                <Guestbook/>
            </div>
        </div>
    );
}

export default Sidebar