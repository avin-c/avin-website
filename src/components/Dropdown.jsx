import React from "react";
import { useState } from 'react';

function DropdownMenu({options, current, size, onselect}){
    const [isList, setList]= useState(false);

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
    return (
        <div id = "dropdownBox" >
            <button className = "button" onClick={handleClick}>{current}</button>
            <ul id = "options" >
                {isList && 
                    options.map((item) => (
                        <li id = "listItems" onClick={() => handleSelect(item)} key={item}>
                            {item}</li>
                    ))
                }
            </ul>
        </div>
        
        

    )
}

export default DropdownMenu