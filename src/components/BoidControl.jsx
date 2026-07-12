import React from "react";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
function BoidControl (props){
    function setMinMax (value){
        props.setMinMax({min: value[0], max: value[1]});
    }
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
                <label htmlFor = "count">Number of entities (above 200 may cause lag)</label>
                <div  className="rangeInput">
                    <Slider.Root defaultValue={[50]} className="slider-root" onValueChange={setMinMax}>
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
                    <Slider.Root defaultValue={[25, 75]} className="slider-root" onValueChange={setMinMax}>
                        <Slider.Track className = "slider-track">
                            <Slider.Range className="slider-range" />
                        </Slider.Track>
                        <Slider.Thumb className="slider-thumb"/>
                        <Slider.Thumb className="slider-thumb"/>
                    </Slider.Root>
                </div>
            </div>
            <strong>Boid Forces Strength:</strong>
            <div className = "triRange">
                
                <div className = "rangeInput" id = "separation">
                    <label>Separation</label>
                    <Slider.Root orientation="vertical" defaultValue={[50]} className="slider-root" onValueChange={setMinMax}>
                        <Slider.Track className = "slider-track">
                            <Slider.Range className="slider-range" id="singleRange"/>
                        </Slider.Track>
                        <Slider.Thumb className="slider-thumb"/>
                    </Slider.Root>
                </div>
                <div className = "rangeInput" id = "cohesion">
                    <label>Cohesion</label>
                    <Slider.Root orientation="vertical" defaultValue={[50]} className="slider-root" onValueChange={setMinMax}>
                        <Slider.Track className = "slider-track">
                            <Slider.Range className="slider-range" id="singleRange"/>
                        </Slider.Track>
                        <Slider.Thumb className="slider-thumb"/>
                    </Slider.Root>
                </div>
                <div className = "rangeInput" id = "alignment">
                    <label>Alignment</label>
                    <Slider.Root orientation="vertical" defaultValue={[50]} className="slider-root" onValueChange={setMinMax}>
                        <Slider.Track className = "slider-track">
                            <Slider.Range className="slider-range" id="singleRange"/>
                        </Slider.Track>
                        <Slider.Thumb className="slider-thumb"/>
                    </Slider.Root>
                </div>
                

            </div>

        </div>
    );
}
export default BoidControl