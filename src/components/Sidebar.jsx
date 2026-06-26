import React from "react";
import DropdownSvg from "./svgcomponents/DropdownSvg";
function Sidebar(){
    console.log("sidebar");
    return (
        <div className = "sidebar">
            <div className = "sideButton">
                <DropdownSvg side = {48}/>
            </div>

            <h5 className="sideTitle">Fun stuff</h5>
        </div>
    );
}

export default Sidebar