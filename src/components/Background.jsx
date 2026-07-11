import React from "react";
import { useEffect, useRef } from "react";
import { Application, Graphics } from 'pixi.js';

function Background (props){
    const containerRef = useRef(null);

    //pythag function
    function magnitude(x,y){
        return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    }


    useEffect(() => {
        const app =  new Application();
        let isDestroyed = false;

        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; //prevent top left
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

                currentFish.velocity = {x: 0, y: 0}; //initialize velo and accel vectors
                currentFish.acceleration = {x: 0, y: 0};
                
                currentFish.sprite = new Graphics ().poly([
                        -15, -10,
                        15, 0,
                        -15, 10,
                        -5, 0
                    ])
                    .fill({color: props.color, alpha: 0.3});

                currentFish.position = { //randomize fish spawn location
                    x: Math.random()*window.innerWidth, 
                    y: Math.random()*window.innerHeight
                };
                currentFish.sprite.rotation = 0;    
                currentFish.sprite.x = currentFish.position.x;
                currentFish.sprite.y = currentFish.position.y;
            }
            app.ticker.add((ticker) => {
                let maxVelocity = 4; //max speed of fish velo
                let maxAcceleration = 0.2;
                let seperation = 50;
                let seperationIndex = 100;

                for (let i = 0; i < props.count; i++){
                    let fish = fishArray[i];    

                    //ACCELERATION PART

                    //mouse steering acceleration
                    fish.acceleration.x = (mouse.x - fish.position.x)/100;
                    fish.acceleration.y = (mouse.y - fish.position.y)/100;

                    //rest of boid's acceleration
                    let steeringX = 0; //boid x and y vector
                    let steeringY = 0;

                    let count = 0;

                    //iterating over every other fish
                    for (let j = 0; j < fishArray.length; j++) {
                        if (j != i){

                            ///calculate x, y, and total distance 
                            let deltaX = fishArray[i].position.x - fishArray[j].position.x;
                            let deltaY = fishArray[i].position.y - fishArray[j].position.y;
                            let distance = magnitude(deltaX, deltaY);

                            //seperation vector added if distance is within seperation radius
                            if (distance < seperation && distance != 0){
                                count++;
                                steeringX += deltaX / distance;
                                steeringY += deltaY / distance;
                            }
                        }
                    }

                    //evens out the steering between 
                    if (count > 0){
                        steeringY = (steeringY / count)*seperationIndex;
                        steeringX = (steeringX / count)*seperationIndex;
                    }
                    
                    //adding boid steering logic to acceleration
                    fish.acceleration.x += steeringX; 
                    fish.acceleration.y += steeringY;

                    let totalAcceleration = magnitude(fish.acceleration.x, fish.acceleration.y);
                    //clamping down acceleration
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

                    fish.sprite.rotation = Math.atan2(fish.velocity.y, fish.velocity.x);
                    //position part
                    fish.position.x += fish.velocity.x;
                    fish.position.y += fish.velocity.y;

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