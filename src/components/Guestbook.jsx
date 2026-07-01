import React from "react";
import GuestbookDisplay from "./GuestbookDisplay";
import GuestbookForm from "./GuestbookForm";
import { useState } from "react";
import getStroke from "perfect-freehand";
function Guestbook (){
    const [refreshKey, setRefreshKey] = useState(0);
    const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1); // Increments key to force remount
    };
    function strokeToPath (pointList) {
        return getStroke (
          pointList, 
          {
            size: 5,
            thinning: 0.5,
            smoothing: 0.5,
            streamline: 0.5,
          }
        )
      }
    function getSvgPathFromStroke(stroke) {
    if (!stroke.length) return "";

    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ["M", ...stroke[0], "Q"]
    );

    d.push("Z");
    return d.join(" ");
    }
    console.log("guestbook");
    return(
        <div className = "guestbook">
            <GuestbookForm strokeToPath= {strokeToPath} getSvgPathFromStroke = {getSvgPathFromStroke} handleRefresh = {handleRefresh} refreshKey = {refreshKey} setRefreshKey={setRefreshKey}/>
            <GuestbookDisplay strokeToPath= {strokeToPath} getSvgPathFromStroke = {getSvgPathFromStroke} key = {refreshKey}/>
        </div>
    );
}

export default Guestbook