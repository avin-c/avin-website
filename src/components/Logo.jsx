import React from "react";
import mybutton from "../assets/mybutton.png";
function Logo (){
    function openMyWebsite(){
        window.location.href = "https://avin-c.github.io/avin-website";
    }
    return (
        <a onClick={openMyWebsite} className = "myButton">
            <img src={mybutton} alt = "My button" title = "Visit my website!"></img>
        </a>

    );
}

export default Logo