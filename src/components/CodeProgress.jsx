import { code } from "motion/react-client";
import { useState , useEffect } from "react";
import DropdownMenu from "./Dropdown";
const horizonsEuropa = 35*60

function CodeProgress(){
    
    const [seconds, setSeconds] = useState(35*3600);
    const [current, setCurrent] = useState("Europa");
    useEffect(() => {
        let timeoutId;

        const loop = async () => {
            try {
                const res = await fetch("https://hackatime.hackclub.com/api/v1/users/freshshrimp/project/avin-website");
                
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                
                const data = await res.json();
                console.log("Fetched data:", data);
                setSeconds(data.total_seconds);
            } catch (error) {
                console.error("Failed to fetch coding progress:", error);
            } finally {
                // 3. This 'finally' block ensures that even if the fetch fails, 
                // the loop tries again later. Increased to 30 seconds (30000ms).
                timeoutId = setTimeout(loop, 30000); 
            }
        };

        loop();

        return () => clearTimeout(timeoutId);
    }, []);


    const codeMinutes = Math.floor(seconds/60);

    function hoursAppend(minutes){
        const hours = Math.floor(minutes/60);
        const remainingMinutes = minutes - (hours * 60);
        if (remainingMinutes > 0){
            return hours + "h " + remainingMinutes + "m";
        }
        else{
            return hours + "h ";
        }
        
    }
    function calculatePercentage(num, den, decimals) {
        const multiplier = 10**(decimals+2);
        const percentage = Math.floor(num/den * multiplier);
        return percentage / 10**(decimals);

    }


    return (
        <div className = "codeProgress">
            <div id = "progressStats">
                <p className="statBox">{hoursAppend(codeMinutes)} spent on this website</p>
                <p className = "statBox">{current} goal: {hoursAppend(horizonsEuropa, 0)}</p>
                <p className  = "statBox">Progress on goal: {calculatePercentage(codeMinutes, horizonsEuropa, 2)}%</p>
            </div>
            <div id = "barProgress">
                <DropdownMenu id = "dropDown" current = {current} options = {["Daily", "Europa", "Total",  ]} onselect = {setCurrent}/>
                <ProgressBar bgcolor= "#93B7BE" completed = {calculatePercentage(codeMinutes, horizonsEuropa, 2)} />
            </div>
        </div>
    );
}       



function ProgressBar (props){
    const { bgcolor, completed} = props;

    const fillerStyles = {
        width: `${completed}%`,
        backgroundColor: bgcolor,   
    }
    return (
        <div id = "containerStyles">
            <div style = {fillerStyles} id = "fillerStyles">
                <span></span>
            </div>
        </div>
    );
};



export default CodeProgress

