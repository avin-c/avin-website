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
    function rgbtoHex(rgb){
        for (let i =0; i<3; i++){
            rgb[i] = Math.round(rgb[i]);
        }
        for (let i =0; i<3; i++){
            rgb[i] = rgb[i].toString(16).padStart(2, "0");
        }
        return "#" + rgb.join("");
    }
    function findAvg (num1, num2){
        return Math.round((num1+num2)/2);
    }
    function findMiddle(hex1, hex2){
        let rgb1 = hextoRGB(hex1);
        let rgb2 = hextoRGB(hex2);
        let middleRGB = ["","",""];
        for (let i = 0; i<3; i++){
            middleRGB[i] = findAvg(rgb1[i], rgb2[i]);
        }
        
        let middlehex = rgbtoHex(middleRGB);
        return middlehex;

    }
    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return [ h, s, l ];
    }
    function hslToRgb(h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;

            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [ r * 255, g * 255, b * 255 ];
    }
    function lowerBrightness (hex){
        let rgb = hextoRGB(hex);
        let hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        console.log("hsl" + hsl)
        let lowerBrightnessHSL = hsl;
        lowerBrightnessHSL[2] = 0.15;
        console.log("newhsl" + lowerBrightnessHSL);
        let lowerBrightnessRGB = hslToRgb(lowerBrightnessHSL[0], lowerBrightnessHSL[1], lowerBrightnessHSL[2]);
        console.log("new rgb" + lowerBrightnessRGB);
        let lowerBrightnessHex = rgbtoHex(lowerBrightnessRGB);
        console.log("new hex " + lowerBrightnessHex);
        return lowerBrightnessHex;
        
        
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
        document.documentElement.style.setProperty(`--accent-color-color`, `${colorArray[3]}`);//setting 2nd accent color
        document.documentElement.style.setProperty('--prisecond-color', `${findMiddle(colorArray[0], colorArray[1])}`); //calculate prisecond color
        document.documentElement.style.setProperty(`--dark-text-color`, `${lowerBrightness(colorArray[0])}`); //calculate dark text color by hex > rgb > hsl, lower l, hsl > rgb > hex
        console.log(findMiddle(colorArray[0], colorArray[1]));
        console.log("dark text color" + lowerBrightness(colorArray[0]));

        console.log("updated css variables with " + colorArray);
    }, [lastValidColorLink]);
    return(
        <div id = {props.id} className = "content">
            <h3 className = "header">Theme Builder</h3>
            <p>Insert a <a href="https://coolors.co/322642-54426b-cbdf90-f19455">coolors.co</a> palette link to customize your viewing experience! (No guarantee of accessability/contrast)</p>
            <input
                value = {colorLink}
                placeholder="Paste coolors color palette here"
                onChange={(e) => setColorLink(e.target.value)}
            ></input>
            
            <div>{isLinkValid(colorLink) ? "": "Please enter a valid link"}</div>
            
            <div className="colorDisplay"></div>
        </div>
    );
}
export default ThemeBuilder