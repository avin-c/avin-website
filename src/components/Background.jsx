import React from "react";
import { useEffect, useRef } from "react";
import { Application, Graphics } from 'pixi.js';

function Background (props){
    const containerRef = useRef(null);

    useEffect(() => {
        const app =  new Application();
        let isDestroyed = false;

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
                let maxSpeed = 4; //max speed of fish velo
                let seperation = 50;
                let seperationIndex = 1.5;

                let mouseX = app.renderer.events.pointer.global.x; //mouse position
                let mouseY = app.renderer.events.pointer.global.y;
                for (let i = 0; i < props.count; i++){
                    let fish = fishArray[i];

                    fish.acceleration.x = (mouseX - fish.position.x)/100;
                    fish.acceleration.y = (mouseY - fish.position.y)/100;

                    let steeringX = 0;
                    let steeringY = 0;
                    for (let j = 0; j < fishArray.length; j++) {
                        if (j != i){
                            let deltaX = fishArray[i].position.x - fishArray[j].position.x;
                            let deltaY = fishArray[i].position.y - fishArray[j].position.y;
                            let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                            if (distance < seperation){
                                steeringX += deltaX / distance;
                                steeringY += deltaY / distance;
                                steeringX *= seperationIndex;
                                steeringY *= seperationIndex;
                            }
                        }
                    }
                    fish.acceleration.x += steeringX;
                    fish.acceleration.y += steeringY;

                    if (Math.abs(fish.velocity.x) < maxSpeed || Math.abs(fish.velocity.x + fish.acceleration.x) < maxSpeed ){
                        fish.velocity.x += fish.acceleration.x;
                    }
                    if (Math.abs(fish.velocity.y) < maxSpeed || Math.abs(fish.velocity.y + fish.acceleration.y) < maxSpeed){
                        fish.velocity.y += fish.acceleration.y;
                    }
                    fish.velocity.x *= 0.9; //dampen velocity to remove bounceback
                    fish.velocity.y *= 0.9;

                    fish.sprite.rotation = Math.atan2(fish.velocity.y, fish.velocity.x);
                    
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