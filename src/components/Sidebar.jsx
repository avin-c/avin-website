import React from "react";
import { useState } from "react";
import GuestbookSvg from "./svgcomponents/GuestbookSvg";
import Guestbook from "./Guestbook";
function Sidebar(props){
    const [isHovered, setExpand] = useState(false);

    function handleCollapse(){
        if (isHovered == true){
            setExpand(false);
        }
        else{
            setExpand(true);
        }
    }
    
    function handleExpand (){
       
        setExpand(true);
    }
    return (
        <div id = "sidebar" className={`${isHovered? "sideExpand":"sideCollapse"}`} >
            <div className = "sideButton" onClick={handleCollapse} onMouseEnter={handleExpand}>
                <GuestbookSvg color = {props.iconColor} side = {36}/>
            </div>
            <div className="sidebody">
                <h3 className="header">Sign my guestbook!</h3>
                <Guestbook/>
            </div>
        </div>
    );
}

export default Sidebar