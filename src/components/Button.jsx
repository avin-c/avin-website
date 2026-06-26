import shrekScare1 from "../assets/shrekScare.png";
import shrekScare2 from "../assets/shrekScare2.png";
import shrekAudio from "../assets/shrekAudio.mp3";
import React from "react";
import { useRef , useEffect, useState} from "react";
function Button(){
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(shrekAudio);
        audioRef.current.preload = "auto";
        audioRef.current.load();
    }, []);
    const jumpscareList  = [
        shrekScare1,
        shrekScare2
    ]
    const [shrek, setShrek] = useState(false);
    const [shrekType, setShrekType] = useState(jumpscareList[0]);
    function shrekScare(){
        
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        console.log(audioRef.current.currentTime);
        setShrekType(jumpscareList[Math.floor(Math.random() * jumpscareList.length)]);
        setShrek(true);
        setTimeout(() => {
            setShrek(false);
            audioRef.current.pause();
        }, (1500))
    }
    console.log(Math.floor(Math.random()*jumpscareList.length));    
    return ( 
    <div className = "background">
        <button id = "shrekButton" onClick={shrekScare}>
        Surprise!
        </button>
        <img className={` jumpscare ${shrek ? "shrekAppear" : ""}`}  src = {shrekType}></img>
    </div>
  );
}
export default Button