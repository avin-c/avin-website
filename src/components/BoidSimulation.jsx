import React from "react";
import {useState, useEffect, useRef, useMemo} from "react";
import Background from "./Background";
import BoidControl from "./BoidControl";

function BoidSimulation (props){

    const [count, setCount] = useState(200);
    const [minMax, setMinMax] = useState({min: 2.5, max:5});
    const [separationIndex, setSeparationIndex] = useState(5);
    const [cohesionIndex, setCohesionIndex] = useState(0.6);
    const [alignmentIndex, setAlignmentIndex] = useState(2);
    const [mouse, setMouse] = useState("none");
    return(
        <div id = {props.id} className="content" >
            <Background color = "#FFFFFF" 
                count = {count} 
                minVelocity = {minMax.min} 
                maxVelocity = {minMax.max} 
                separation = {separationIndex} 
                cohesion = {cohesionIndex} 
                alignment = {alignmentIndex}
                mouse = {mouse} />
            <BoidControl count ={count} 
                setCount = {setCount} 
                minMax = {minMax} 
                setMinMax = {setMinMax}
                 setSeparation = {setSeparationIndex} 
                 separationIndex = {separationIndex} 
                 setCohesion = {setCohesionIndex} 
                 cohesionIndex = {cohesionIndex} 
                 setAlignment = {setAlignmentIndex} 
                 alignmentIndex = {alignmentIndex} 
                 setMouse = {setMouse} 
                 mouse = {mouse}
                 id = {props.id}
                 iconColor = {props.iconColor}
                 />
        </div>
    )
} 
export default React.memo(BoidSimulation);