import { code } from "motion/react-client";
import { useState , useEffect } from "react";
import DropdownMenu from "./Dropdown";
import { time } from "motion";

function CodeProgress({name, id , seconds}){

    
    
    const [current, setCurrent] = useState("Europa");

    const goals = [
        {
            name: "Daily",
            hours: 6,
            color: "#F9AC33"

        },
        {
            name: "Europa",
            hours: 35,
            color: "#F97F33"
        },
        {
            name: "Total",
            hours: 100,
            color: "#f34932"
        }

    ]
    const goal = goals.find(word => word.name === current);
    const names = goals.map(goal => goal.name);



    const [dailySeconds, setDaily] = useState(0);
    const now = new Date();
    const startOfToday = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000);
    console.log("start of today" + startOfToday);

   

    useEffect(() => {
        let timeoutId;

        const loop = async () => {
            try {
                const res = await fetch("https://hackatime.hackclub.com/api/v1/users/freshshrimp/heartbeats/spans");

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                
                const data = await res.json();
                const todaySpans = data.spans.filter(
                        (span) => span.start_time >= startOfToday
                    );

                    const totalToday = todaySpans.reduce(
                        (sum, span) => sum + span.duration, 0
                    );
                setDaily(totalToday);
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
    

    console.log(dailySeconds);
    const codeMinutes = Math.floor(seconds/60);
    function hoursAppend(seconds){
        const minutes = Math.floor(seconds/60);
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
        let percent = 0;
        if (goal.name == "Daily"){
            const multiplier = 10**(decimals+2);
            const percentage = Math.floor(dailySeconds/den * multiplier);
            percent =  percentage / 10**(decimals);
        }
        else{
            const multiplier = 10**(decimals+2);
            const percentage = Math.floor(num/den * multiplier);
            percent =  percentage / 10**(decimals);
        }

        if (percent <= 100){
            return percent;
        }
        else{
            return calculatePercentage(den, den, decimals)
        }


    }
    function timeStatement(goalName){
        if (goalName == "Daily"){
            const hours = hoursAppend(dailySeconds);
            return hours + " spent on this website today";
        }
        if (goalName == "Europa" || goalName == "Total"){
            const hours = hoursAppend(seconds);
            return hours + " spent on this website";
        }
    }

    return (
        <div className = "content" id = {id}>
            <h3 className = "header">{name}</h3>
            <div id = "progressStats">
                <p className="statBox">{timeStatement(goal.name)}</p>
                <p className = "statBox">{goal.name} goal: {hoursAppend(goal.hours*3600, 0)}</p>
                <p className  = "statBox">Progress on goal: {calculatePercentage(seconds, goal.hours*3600, 0)}%</p>
            </div>
            <div id = "barProgress">
                <DropdownMenu id = "dropDown" color = {goal.color} current = {current} options = {names} onselect = {setCurrent}/>
                <ProgressBar bgcolor= {goal.color} completed = {calculatePercentage(seconds, goal.hours*3600, 2)} />
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

