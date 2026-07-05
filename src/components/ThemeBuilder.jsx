import React from "react";
import { useState, useEffect} from "react";
function ThemeBuilder(props){
    const [colorLink, setColorLink] = useState("");
    
    const [lastValidColorLink, setLastValidColorLink] = useState("https://coolors.co/322642-54426b-cbdf90-f19455");

    function isLinkValid (url){
        console.log(url);
        if (url.startsWith("https://coolors.co/")){
            let colorArray = url.replace("https://coolors.co/", "");
            colorArray = colorArray.split("?")[0];
            colorArray = colorArray.replace(/\/$/, "");
            colorArray = colorArray.split('-');
            console.log(colorArray.length);

            if (colorArray.length == 4){
                console.log("second condition passed");
                let isvalid = true;
                
                for (let i = 0; i < colorArray.length; i++){
                    if (!checkHexaColor(colorArray[i])){
                        isvalid = false;
                        break;
                    }
                }
                if (isvalid == true){
                   return true;
                }

                
            }
            else{
                return false;
            }
        }
        else{
            return false;
    }
    }
    function checkHexaColor (hexcode){
        if (hexcode.length != 6){
            return false;
        }
        let hexArray = hexcode.split("");
        for (let i  = 0; i < 6; i++){
            if (/^[0-9a-f]$/i.test(hexArray[i]) == false){
                return false;
            }
        }
        return true;
    }

    function linkToArray (validLink){
        let colorArray = validLink.replace("https://coolors.co/", "");
        colorArray = colorArray.split("?")[0];
        colorArray = colorArray.replace(/\/$/, "");
        colorArray = colorArray.split('-');

        colorArray = colorArray.map((item) => ("#"+item));
        console.log(colorArray);
        return colorArray;
    }
    function hextoRGB(hex){
        hex = hex.replace("#", "");
        let rgbArray = ["","",""];
        let hexArray = hex.split("");

        for (let i = 0;i<rgbArray.length;i++){
            rgbArray[i] = hexArray[i*2] + hexArray[i*2+1];
            rgbArray[i] = Number("0x" + rgbArray[i]);
        }
        return rgbArray;
        
    }
    function hexToRG(primaryColor, secondaryColor){
        primaryColor = primaryColor.replace("#", "");
        secondaryColor = secondaryColor.replace("#", "");
        let rgbPrimary = ["","",""];
        let rgbSecondary = ["","",""];

        for (let i = 0; i < primaryColor.length; i++){
            rgbPrimary[i] = rgbPrimary[i*2] + rgbPrimary[i*2+1];
            rgbSecondary[i] = rgbSecondary[i*2] + rgbSecondary[i*2+1];
        }
        return(rgbPrimary);
    }
    

    useEffect(() => {
        console.log("use effect color link");
        if (isLinkValid(colorLink) == true){
            setLastValidColorLink(colorLink);
        }
    }, [colorLink]);

    useEffect(() => {
        console.log("lastvalidlink updated");
        let colorArray = linkToArray(lastValidColorLink);
        document.documentElement.style.setProperty(`--primary-color`, `${colorArray[0]}`); //setting primary color
        document.documentElement.style.setProperty(`--secondary-color`, `${colorArray[1]}`);//setting secondary color
        document.documentElement.style.setProperty(`--accent-color`, `${colorArray[2]}`);//setting accent color
        document.documentElement.style.setProperty(`--accent-accent-color`, `${colorArray[3]}`);//setting 2nd accent color

        console.log(hextoRGB(colorArray[0]));

        console.log("updated css variables with " + colorArray);
    }, [lastValidColorLink]);
    return(
        <div id = {props.id} className = "content">
            <h3 className = "header">Theme Builder</h3>
            <p>{"(No guarantee of accessability/contrast)"}</p>
            <input
                value = {colorLink}
                placeholder="Paste coolors color palette here"
                onChange={(e) => setColorLink(e.target.value)}
            ></input>
            <div>isValid: {isLinkValid(colorLink).toString()}</div>
            <div className="colorDisplay"></div>
        </div>
    );
}
export default ThemeBuilder