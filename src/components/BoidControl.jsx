import React from "react";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
function BoidControl (props){
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
            <div>
                <label htmlFor = "count">Number of entities (above 200 may cause lag)</label>
                <input name = "countrange" type = "range" id = "count"></input>
                <label></label>
            </div>
            <div>
                <label htmlFor = "minmax">Minimum and maximum entity velocity</label>
                <div id = "twothumb">
                    <Slider.Root defaultValue={[25, 75]} className="slider-root">
                        <Slider.Track className = "slider-track">
                            <Slider.Range className="slider-range" />
                        </Slider.Track>
                        <Slider.Thumb className="slider-thumb"/>
                        <Slider.Thumb className="slider-thumb"/>
                    </Slider.Root>
                </div>
            </div>

        </div>
    );
}
export default BoidControl