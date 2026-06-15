import { useState , useEffect } from "react";

function CodeProgress(){
    
    const [seconds, setSeconds] = useState(0);

    async function fetchData() {
        const res = await fetch("https://hackatime.hackclub.com/api/v1/users/freshshrimp/project/avin-website");
        const data = await res.json();

        console.log("https://hackatime.hackclub.com/api/v1/users/freshshrimp/project/avin-website", data);

        setSecondsSeconds(data.total_seconds);
    }    
    useEffect(() => {
    let timeoutId;

    const loop = async () => {
        await fetchData();
        timeoutId = setTimeout(loop, 60000);
    };

    loop();

    return () => clearTimeout(timeoutId);
    }, []);
    return <div>{seconds}</div>;
}

export default CodeProgress