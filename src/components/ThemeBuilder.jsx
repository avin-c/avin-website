import React from "react";
import { useState, useEffect, useCallback, useRef} from "react";
import { ColorPicker, hexToHsl, useColorState, hexToRgb, rgbToHsl, hslToHex, rgbToHex} from 'react-beautiful-color';
import 'react-beautiful-color/dist/react-beautiful-color.css';

function ThemeBuilder(props){
    const requestAnimationFrameRef = useRef(null);
    const colorCount = 5;
    const LIGHT_THRESHOLD = 80;
    const DARK_LIGHT_VALUE = 15;
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

        const  hex = hsvaToHex(newColor.colorInput.h, newColor.colorInput.s, newColor.colorInput.v, newColor.colorInput.a);

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
    function findAvg (num1, num2){
        return Math.round((num1+num2)/2);
    }
    function findMiddle(hex1, hex2){
        let rgb1 = hexToRgb(hex1);
        let rgb2 = hexToRgb(hex2);
        let middleRGB = {r: 0, g: 0, b: 0};
    
        middleRGB.r = findAvg(rgb1.r, rgb2.r);
        middleRGB.g = findAvg(rgb1.g, rgb2.g);
        middleRGB.b = findAvg(rgb1.b, rgb2.b);
        
        let middleHex = rgbToHex(middleRGB)
        return middleHex;

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
        let hsl = hexToHsl(hex);
        let lowerBrightnessHSL = hsl;
        lowerBrightnessHSL.l = DARK_LIGHT_VALUE;
        let lowerBrightnessHex = hslToHex(lowerBrightnessHSL);
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
        if (requestAnimationFrameRef.current) cancelAnimationFrame(requestAnimationFrameRef.current);
        requestAnimationFrameRef.current = requestAnimationFrame(() => {
            let calcDarkText = lowerBrightness(colors[0]);
            let priSecond = findMiddle(colors[0], colors[1]);
            let hslSecondary = hexToHsl(colors[1]);
            if (hslSecondary.l > LIGHT_THRESHOLD) calcDarkText = "#FFFFFF";

            props.setAppColors({
                primary: colors[0],
                primarysecondary: priSecond,
                secondary: colors[1],
                text: colors[4],
                darktext: calcDarkText,
                accent1: colors[2],
                accent2: colors[3],
            });
        });
        return () => cancelAnimationFrame(requestAnimationFrameRef.current);
    }, [colors]);

    useEffect(() => {
        props.setTextColor(colors[4]);
    }, [colors[4]])
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