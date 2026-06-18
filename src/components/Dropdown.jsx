import React from "react";
import { useState } from 'react';
import { useRef, useEffect } from "react";
import DropdownSvg from "./svgcomponents/DropdownSvg";

function DropdownMenu({options, color, current, size, onselect}){
    const [isList, setList]= useState(false);
    const dropdownRef = useRef(null);
    function handleClick (){
        setList(!isList);
        console.log(isList, options);

    }
    function handleSelect(item){
        if (isList == true){
            onselect(item);
            setList(false);
    }
    }
    
    useEffect(() => { 
        console.log("effect ran");
        function handleClickOutside(event) {
            console.log("document click");
            if (!dropdownRef.current.contains(event.target)) {
                setList(false);
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref = {dropdownRef} id = "dropdownBox" >
            <button style={{backgroundColor: color}} className = "button" onClick={handleClick}>
                {current}
                <DropdownSvg upDown={isList}/>
            </button>
                {isList && (
                    <ul id="options">
                        {options.map((item) => (
                            <li id="listItems" onClick={() => handleSelect(item)} key={item}>
                                {item}
                            </li>
                        ))}
                </ul>
            )}
            
        </div>
        
        

    )
}

export default DropdownMenu