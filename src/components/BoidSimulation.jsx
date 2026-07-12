import React from "react";
import {useState, useEffect, useRef} from "react";
import Background from "./Background";
import BoidControl from "./BoidControl";

function BoidSimulation (props){

    const [count, setCount] = useState(100);
    const [minMax, setMinMax] = useState({min: 2, max: 4});
    const [boid, setBoid] = useState({s: 10, c: 0.6, a: 2});
    const [mouse, setMouse] = useState("repel");
    return(
        <div>
            <Background color = "#FFFFFF" count = {count}/>
            <BoidControl setCount = {setCount} setMinMax = {setMinMax} setBoid = {setBoid} setMouse = {setMouse}/>
        </div>
    )
} 
export default BoidSimulation