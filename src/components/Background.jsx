import React from "react";
import { useEffect, useRef } from "react";
import { Application, Graphics } from 'pixi.js';
import { scale } from "motion";

function Background (props){
    const containerRef = useRef(null);

    //pythag function
    function magnitude(x,y){
        return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    }
    function scaleVector(vector, scaleFactor){
        vector.x *= scaleFactor;
        vector.y *= scaleFactor;

    }
    function normalizeVector(vector){
        let total = magnitude(vector.x, vector.y);
        if (total != 0){
            vector.x /= total;
            vector.y /= total;
        }
    }

    useEffect(() => {
        const app =  new Application();
        let isDestroyed = false;
        let screenX = window.innerWidth;
        let screenY = window.innerHeight;
        const mouse = { x: screenX / 2, y: screenY / 2 }; //prevent top left
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);

        async function initializePixiJS(){ //all pixijs setup
            
            await app.init ( 
                {
                    resizeTo : window,
                    backgroundAlpha: 0,
                    antialias: true,
                    eventMode: "dynamic",
                }
            )
            if (isDestroyed) { //checks if we have left the page or otherwise stopped rendering
            app.destroy({ children: true });
            return;
            }

            if (containerRef.current){
                containerRef.current.appendChild(app.canvas);
            }

            const fishArray = new Array(props.count);
            for (let i = 0; i < props.count; i++){
                fishArray[i] = {};
                let currentFish = fishArray[i];

                //random initial velocity
                let angle = Math.random() * Math.PI * 2
                currentFish.velocity = {x: Math.cos(angle)*4, y: Math.sin(angle)*4}; //initialize velo and accel vectors
                currentFish.acceleration = {x: 0, y: 0};
                
                currentFish.sprite = new Graphics ().poly([
                        -15, -10,
                        15, 0,
                        -15, 10,
                        -5, 0
                    ])
                    .fill({color: props.color, alpha: 0.1});

                currentFish.position = { //randomize fish spawn location
                    x: Math.random()* screenX, 
                    y: Math.random()* screenY
                };
                currentFish.sprite.rotation = 0;    
                currentFish.sprite.x = currentFish.position.x;
                currentFish.sprite.y = currentFish.position.y;
            }
            app.ticker.add((ticker) => {
                let maxVelocity = 4; //max speed of fish velo
                let maxAcceleration = 0.2;



                for (let i = 0; i < props.count; i++){
                    let fish = fishArray[i];    

                    //ACCELERATION PART
                    
                    
                    //mouse steering acceleration
                    let mouseForce = {x: 0, y: 0};
                    let mouseForceIndex = 0; 
                    mouseForce.x = (mouse.x - fish.position.x);
                    mouseForce.y = (mouse.y - fish.position.y);
                    ///////////////////////////////////////////////////////////

                    //boid acceleration forces

                    //----separation-----
                    let separationForce = {x: 0, y: 0};
                    let separationIndex = 10; //weighting of separation
                    let separationRadius = 50;
                    let separationCount = 0;

                    //----cohesion-------
                    let cohesionForce = {x: 0, y: 0};
                    let cohesionIndex = 1; //weighting of cohesion
                    let cohesionRadius = 30; //size of radius that fish wants to go closer to the average position of
                    let totalPositions = {x: 0, y: 0};
                    let cohesionCount = 0;
                    let averagePosition = {x: 0, y: 0};

                    //----alignment------
                    let alignmentForce = {x: 0, y: 0};
                    let alignmentIndex = 0;
                    let alignmentRadius = 0; //size of fish radius that fish wants to go closer to 

                    //iterating over every other fish
                    for (let j = 0; j < fishArray.length; j++) {
                        if (j != i){

                            ///calculate x, y, and total distance 
                            let deltaX = fish.position.x - fishArray[j].position.x;
                            let deltaY = fish.position.y - fishArray[j].position.y;
                            
                            let distance = magnitude(deltaX, deltaY);

                            //separation vector added if distance is within separation radius
                            if (distance < separationRadius && distance != 0){
                            
                                separationForce.x += deltaX / (distance * distance);
                                separationForce.y += deltaY / (distance * distance);

                                separationCount++; //counts fish in radius 
                            }

                            //cohesion vector, only doing sums
                            if (distance < cohesionRadius && distance != 0){
                                totalPositions.x += fishArray[j].position.x - fish.position.x;
                                totalPositions.y += fishArray[j].position.y - fish.position.y;
                                cohesionCount++;
                            }
                            
                        }
                    }

                    //separation: evens out the steering between different fish
                    if (separationCount > 0){
                        separationForce.x /= separationCount;
                        separationForce.y /= separationCount;
                    }
                    //cohesion: calculate average position
                    if (cohesionCount > 0){
                        averagePosition.x = totalPositions.x / cohesionCount;
                        averagePosition.y = totalPositions.y / cohesionCount;
                    }
                    
                    cohesionForce.x = averagePosition.x;
                    cohesionForce.y = averagePosition.y;
                    
                    //adding boid steering logic to acceleration
                    normalizeVector(mouseForce);
                    normalizeVector(separationForce);
                    normalizeVector(cohesionForce);
                    normalizeVector(alignmentForce);
                    scaleVector(mouseForce, mouseForceIndex);
                    scaleVector(separationForce, separationIndex);
                    scaleVector(cohesionForce, cohesionIndex);
                    scaleVector(alignmentForce, alignmentIndex);

                    fish.acceleration.x = mouseForce.x + separationForce.x + cohesionForce.x + alignmentForce.x;
                    fish.acceleration.y = mouseForce.y + separationForce.y + cohesionForce.y + alignmentForce.y;
                    
                    //clamping down acceleration
                    let totalAcceleration = magnitude(fish.acceleration.x, fish.acceleration.y);
                    if (totalAcceleration > maxAcceleration){
                        let ratio = totalAcceleration / maxAcceleration;
                        fish.acceleration.x = fish.acceleration.x / ratio;
                        fish.acceleration.y /= ratio;
                    }

                    //velocity part
                    fish.velocity.x += fish.acceleration.x;
                    fish.velocity.y += fish.acceleration.y;
                    let totalVelocity = magnitude(fish.velocity.x, fish.velocity.y);
                    if (totalVelocity > maxVelocity){
                        let ratio = totalVelocity / maxVelocity;
                        fish.velocity.x = fish.velocity.x / ratio;
                        fish.velocity.y = fish.velocity.y / ratio;
                    }
                    if (magnitude(fish.velocity.x, fish.velocity.y) > 0.01){
                        fish.sprite.rotation += (Math.atan2(fish.velocity.y, fish.velocity.x) - fish.sprite.rotation)*0.25;
                    }
                    //position part
                    fish.position.x += fish.velocity.x;
                    fish.position.y += fish.velocity.y;
                    
                    //screen wrapping

                    let fishLength = 30;
                    let halfFish = fishLength/2
                    if (fish.position.x + fishLength < 0){
                        fish.position.x = screenX + fish.position.x + fishLength;
                    }
                    if (fish.position.x - fishLength > screenX){
                        fish.position.x = fish.position.x - screenX - fishLength;
                    }
                    if (fish.position.y + fishLength < 0){
                        fish.position.y = screenY + fish.position.y + fishLength;
                    }
                    if (fish.position.y - fishLength > screenY){
                        fish.position.y = fish.position.y - screenY - fishLength;
                    }

                    fish.sprite.x = fish.position.x;
                    fish.sprite.y = fish.position.y;
                    
                    fish.acceleration.x = 0;
                    fish.acceleration.y = 0;

                }

            })
            for (let i = 0; i < props.count; i++){
                app.stage.addChild(fishArray[i].sprite);
            }
            


            
        }
    
        initializePixiJS();

        return() => {
            isDestroyed = true;
            window.removeEventListener("mousemove", handleMouseMove);
            if (app.renderer) {
                app.destroy({ children: true });
            }
        };
    }, [props.color, props.count])

    

    return (
        <div ref={containerRef} className="boidsbackground"/>
    );
}

export default Background