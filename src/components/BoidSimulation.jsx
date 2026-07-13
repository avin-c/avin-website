import React from "react";
import {useState, useEffect, useRef} from "react";
import Background from "./Background";
import BoidControl from "./BoidControl";

function BoidSimulation (props){

    const [count, setCount] = useState(100);
    const [minMax, setMinMax] = useState({min: 2, max:4});
    const [boid, setBoid] = useState({s: 10, c: 0.6, a: 2});
    const [mouse, setMouse] = useState("repel");
    return(
        <div id = {props.id}>
            <Background color = "#FFFFFF" count = {count}/>
            <BoidControl count ={count} setCount = {setCount} minMax = {minMax} setMinMax = {setMinMax} setBoid = {setBoid} setMouse = {setMouse} id = {props.id}/>
        </div>
    )
} 
export default BoidSimulation