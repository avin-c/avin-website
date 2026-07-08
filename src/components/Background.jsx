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

            const fishShape = new Graphics ().poly([
                -15, -10,
                15, 0,
                -15, 10,
                -5, 0
            ])
            .fill({color: props.color, alpha: 0.3});

            fishShape.x = window.innerWidth/2; //set position
            fishShape.y = window.innerHeight/2;

            app.stage.addChild(fishShape);

        }

        

        initializePixiJS();

        return() => {
            isDestroyed = true;
            if (app.renderer) {
                app.destroy({ children: true });
            }
        };
    }, [props.color])


    return (
        <div ref={containerRef} className="boidsbackground" />
    );
}

export default Background