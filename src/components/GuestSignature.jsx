import React from 'react';
import { useState, useRef } from 'react';
import { getStroke } from 'perfect-freehand'

export default function GuestSignature() {
  const [strokes, setStroke] = useState([]);
  const [points, setPoints] = useState([]);
  const svgRef = useRef(null);
  function getCoordinates(e){
    if (!svgRef.current) return [0,0,0]
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure;

    return [
      x, y, pressure
    ]
  }

  
  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    
    setPoints([getCoordinates(e)]);

  }

  function handlePointerMove(e) {
    if (e.buttons !== 1) return

    setPoints([...points, getCoordinates(e)]);
  }
  function handlePointerUp(e){
    setStroke([...strokes, points]);
  }

  function megaStrokeList(){
    let getstrokeList = [];
    for (let  i = 0; i < strokes.length; i++) {
      getstrokeList.push(getStroke(
        strokes[i],
        {
          size: 6,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        }
      ));
    }
    return getstrokeList;
  }
  const strokeList = megaStrokeList();
  const stroke = getStroke(points, {
    size: 6,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
  })

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
  function getPathfromConsecutiveStorkes(strokeList){
    let pathDataList = [];
    for (let i = 0; i < strokeList.length; i++){
      pathDataList.push(getSvgPathFromStroke(strokeList[i]));
    }
    return pathDataList;
  }
  const pathData= getSvgPathFromStroke(stroke)
  const pathDataList = getPathfromConsecutiveStorkes(strokeList);

  return (
    <svg
      ref={svgRef}
      width="200"
      height="100"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp = {handlePointerUp}
      style={{ touchAction: 'none' }} 
    >
      
      {points && pathDataList.map((pathItem, index) => {
        return(
          <path 
            d={pathItem} 
            key = {pathItem.index}
            fill = "white"
            stroke = "none"
          />
      
        )})
      }
    </svg>
  )
}