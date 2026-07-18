import React, { useEffect } from "react";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import Expand from "./svgcomponents/BoidIcons/Expand";
import Magnet from "./svgcomponents/BoidIcons/Magnet";
import None from "./svgcomponents/BoidIcons/None";
function BoidControl (props){
    function setMinMax (value){
        props.setMinMax({min: value[0], max: value[1]});
    }
    function setCount (value){
        props.setCount(value[0]);
    }
    function setSeparation (value){
        props.setSeparation(value[0]);
    }
    function setCohesion (value){
        props.setCohesion(value[0]);
    }
    function setAlignment (value){
        props.setAlignment(value[0]);
    }
    function setMouse(value){
        props.setMouse(value);
    }
    useEffect(() => {
        console.log(props.separationIndex);
    }, [props.separationIndex]);
    
    return (
        <div className="content">
            <h3 className = "header">Boids Simulation</h3>
            <p>Boids is an artificial life simulation developed by Craig Reynolds, 
                used to simulate the movement of flocking animals, like birds and fish.
                It adheres to three simple rules: 
            </p>
                <ul>
                    <li>separation - moving to avoid nearby entities</li>
                    <li>cohesion - moving towards the average position of neighbor entities</li>
                    <li>alignment - accelerating towards the average velocity of neighbor entities</li>

                </ul>
            <p>
                Learn more about the <a href = "https://en.wikipedia.org/wiki/Boids">Boids simulation</a>.
            </p>
            <h3>Control my custom Boids simulation below:</h3>

            {/*Add count, minmax, boid variables, mouse mode */}
            <div className = "rangeInput">
                <label htmlFor = "count">Number of entities: {props.count}</label>
                <div  className="rangeInput">
                    <Slider.Root value = {[props.count]} className="slider-root" onValueChange={setCount} min = {0} max = {500}>
                        <Slider.Track className = "slider-track">
                            <Slider.Range className="slider-range" id="singleRange"/>
                        </Slider.Track>
                        <Slider.Thumb className="slider-thumb"/>
                    </Slider.Root>
                </div>
            </div>
            <div className = "rangeInput">
                <label htmlFor = "minmax" id = "minmaxlabel">Minimum and maximum entity velocity </label>
                <div id = "twothumb">
                    <Slider.Root  value = {[props.minMax.min, props.minMax.max]} max = {20} minStepsBetweenThumbs={1} className="slider-root" onValueChange={setMinMax}>
                        <Slider.Track className = "slider-track">
                            <Slider.Range className="slider-range" />
                        </Slider.Track>
                        <Slider.Thumb className="slider-thumb"/>
                        <Slider.Thumb className="slider-thumb"/>
                    </Slider.Root>
                </div>
            </div>
            <div className = "boidmouselayout">
                <div className = "boidSliders">
                    <strong>Boid Forces Strength:</strong>
                    <div className = "triRange">
                        
                        <div className = "rangeInput" id = "separation">
                            <p>{Math.floor(props.separationIndex*10)/10}</p>
                            <label>Separation: </label>
                            <Slider.Root  value = {[props.separationIndex]} orientation="vertical" step = {0.1} max = {15}className="slider-root" onValueChange={setSeparation}>
                                <Slider.Track className = "slider-track">
                                    <Slider.Range className="slider-range" id="singleRange"/>
                                </Slider.Track>
                                <Slider.Thumb className="slider-thumb"/>
                            </Slider.Root>
                        </div>
                        <div className = "rangeInput" id = "cohesion">
                            <p>{Math.floor(props.cohesionIndex*10)/10}</p>
                            <label>Cohesion: </label>
                            <Slider.Root value = {[props.cohesionIndex]}orientation="vertical" step = {0.01} max = {5} className="slider-root" onValueChange={setCohesion}>
                                <Slider.Track className = "slider-track">
                                    <Slider.Range className="slider-range" id="singleRange"/>
                                </Slider.Track>
                                <Slider.Thumb className="slider-thumb"/>
                            </Slider.Root>
                        </div>
                        <div className = "rangeInput" id = "alignment">
                            <p>{Math.floor(props.alignmentIndex*10)/10}</p>
                            <label>Alignment: </label>
                            <Slider.Root value = {[props.alignmentIndex]} orientation="vertical" step = {0.01} max = {10} className="slider-root" onValueChange={setAlignment}>
                                <Slider.Track className = "slider-track">
                                    <Slider.Range className="slider-range" id="singleRange"/>
                                </Slider.Track>
                                <Slider.Thumb className="slider-thumb"/>
                            </Slider.Root>
                        </div>
                    </div>
                </div>
                <div className = "miscControls">
                    <strong>Mouse behavior: </strong>
                    <ToggleGroup.Root className = "ToggleGroup" type = "single" value = {props.mouse} onValueChange = {setMouse}>
                        
                        <ToggleGroup.Item className = "ToggleGroupItem" value = "attract">
                            <Magnet color = "#FFFFFF" side = {32}/>
                            <p>Attract</p>
                        </ToggleGroup.Item>
                        <ToggleGroup.Item className = "ToggleGroupItem" value = "none">
                            <None color = "#FFFFFF" side = {32}/>
                            <p>None</p>
                        </ToggleGroup.Item>
                        
                        <ToggleGroup.Item className = "ToggleGroupItem" value = "repel">
                            <Expand color = "#FFFFFF" side = {32}/>
                            <p>Repel</p>
                        </ToggleGroup.Item>

                    </ToggleGroup.Root> 
                </div>
            </div>

        </div>
    );
}
export default BoidControl