import React from "react";
import { useState, useEffect, useCallback} from "react";
import { ColorPicker, hexToHsl, useColorState, } from 'react-beautiful-color';
import 'react-beautiful-color/dist/react-beautiful-color.css';

function ThemeBuilder(props){
    const colorCount = 5;
    const [colorLink, setColorLink] = useState("");
    
    const [lastValidColorLink, setLastValidColorLink] = useState("https://coolors.co/322642-54426b-cbdf90-f19455-ffffff");
    const [colors, setColors] = useState([
        "#322642",
        "#54426b",
        "#cbdf90",
        "#f19455",
        "#ffffff"
    ]);
    const [selectedColor, setSelectedColor] = useState(0);
    const [{ colorInput, colorState }, setColor] = useColorState({ type: 'hex', value: colors[selectedColor]});

    function setNewColor(newColor) {
    const hex = hsvaToHex(newColor.colorInput.h, newColor.colorInput.s, newColor.colorInput.v, newColor.colorInput.a);
    if (hex.toLowerCase() === colors[selectedColor].toLowerCase()) return; // breaks the echo loop
    setColor(newColor);
    setColors(prev => {
        const next = [...prev];
        next[selectedColor] = hex;
        return next;
    });
}
    const handleColorChange = useCallback(setNewColor, [selectedColor]);
    function isLinkValid (url){
        if (url.startsWith("https://coolors.co/")){
            let colorArray = url.replace("https://coolors.co/", "");
            colorArray = colorArray.split("?")[0];
            colorArray = colorArray.replace(/\/$/, "");
            colorArray = colorArray.split('-');

            if (colorArray.length == colorCount){
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
                return false

                
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
    function hsvaToHex(h, s, v, a = 1) {
        s /= 100;
        v /= 100;

        let c = v * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = v - c;

        let r, g, b;

        if (h < 60) [r,g,b] = [c,x,0];
        else if (h < 120) [r,g,b] = [x,c,0];
        else if (h < 180) [r,g,b] = [0,c,x];
        else if (h < 240) [r,g,b] = [0,x,c];
        else if (h < 300) [r,g,b] = [x,0,c];
        else [r,g,b] = [c,0,x];

        return "#" + [r,g,b]
            .map(value => Math.round((value+m)*255).toString(16).padStart(2,"0"))
            .join("");
    }
    function lowerBrightness (hex){
        let rgb = hextoRGB(hex);
        let hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        let lowerBrightnessHSL = hsl;
        lowerBrightnessHSL[2] = 0.15;

        
        let lowerBrightnessRGB = hslToRgb(lowerBrightnessHSL[0], lowerBrightnessHSL[1], lowerBrightnessHSL[2]);

        let lowerBrightnessHex = rgbtoHex(lowerBrightnessRGB);

        return lowerBrightnessHex;
        
        
    }
    useEffect(() => {
        if (isLinkValid(colorLink) == true){
            setLastValidColorLink(colorLink);
        }
    }, [colorLink]);

    useEffect(() => {
        let colorArray = linkToArray(lastValidColorLink);
        setColors(colorArray);
    }, [lastValidColorLink]);

    useEffect(() => {
        
        let calcDarkText = lowerBrightness(colors[0]);
        
        let priSecond = findMiddle(colors[0], colors[1]);
        let hslSecondary = hexToHsl(colors[1]);
        
        if (hslSecondary.l > 80){
            let tempLightColor = "#FFFFFF";
            calcDarkText = tempLightColor;
        }
        
        props.setAppColors({
            primary: colors[0],
            primarysecondary: priSecond,
            secondary: colors[1],
            text: colors[4],
            darktext: calcDarkText,
            accent1: colors[2],
            accent2: colors[3],
        })

    }, [colors]);
    useEffect(() => {
        setColor({
            type: "hex",
            value: colors[selectedColor]
        })
    }, [selectedColor])
    return(
        <div id = {props.id} className = "content">
            <h3 className = "header">Theme Builder</h3>
            <div className = "colorLayout">
                <div className = "colorDisplay">
                
                    {colors.map((item, index) => {
                        let selected = selectedColor == index; //shorthand for if statement asking if selected color == index

                        return (
                            <label
                                htmlFor={`color-${index}`}
                                key = {index}
                                id = {`color-${index}`}
                                style = {{backgroundColor: item}}
                                className = {`colorButton ${selected? "selectedButton" : ""}`}
                                onClick={() => setSelectedColor(index)}
                            ></label>
                            
                        );

                        })
                        
                    }
                </div>
                <ColorPicker 
                    color={colorInput} 
                    
                    onChange={handleColorChange}
                    className = "colorPicker"
                >
                    <ColorPicker.Saturation className="saturationPicker" />
                        <div className="colorPickerClass">
                            <div className="colorSliderContainer">
                                <ColorPicker.Hue className="color-slider" />
                            </div>
                        </div>
                </ColorPicker>
            </div>
            <p>Insert a <a href="https://coolors.co/322642-54426b-cbdf90-f19455">coolors.co</a> palette link to customize your viewing experience! (No guarantee of accessability/contrast)</p>
            <input
                value = {colorLink}
                placeholder="Paste coolors color palette here"
                onChange={(e) => setColorLink(e.target.value)}
            ></input>
            
            <div>{isLinkValid(colorLink) ? "": "Please enter a valid link"}</div>
            
        </div>
    );
}
export default ThemeBuilder