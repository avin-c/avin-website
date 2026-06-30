import React from 'react';
import { useState, useRef , useMemo} from 'react';
import { getStroke } from 'perfect-freehand'

export default function GuestSignature() {
  const [strokes, setStroke] = useState([]);
  
  const [points, setPoints] = useState([]);
  const [isSig, setText] = useState(false);
  const svgRef = useRef(null);
  function getCoordinates(e){ //helper function to get coordinates relative to bounding box
    if (!svgRef.current) return [0,0,0]
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure;

    return [
      x, y, pressure
    ]
  }

  //starts new current stroke list
  function handlePointerDown(e) { 
    e.target.setPointerCapture(e.pointerId);
    
    setPoints([getCoordinates(e)]);

  }
  //updates current stroke list
  function handlePointerMove(e) {
    if (e.buttons !== 1) return
    setText(true);
    setPoints([...points, getCoordinates(e)]);
    
  }
  //gives current stroke list to full stroke list and resets current stroke list
  function handlePointerUp(e){
    setStroke([...strokes, points]);
    setPoints([]);
  }
  //turns points to stroke with getStroke from perfect freehand library
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
  //turns stroke to svg path through complex calculations I dont understand
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
  const strokePaths = useMemo(
    function () {
      return strokes.map(
        function (strokePoints) {
          return strokeToPath(strokePoints);
        }
      );
    }, [strokes]
  );
  const currentStrokePath = useMemo(
    function () {
      return strokeToPath(points);
    }, [points]
  );

  function handleClear(){
    setPoints([]);
    setStroke([]);
    setText(false);
  }
  function handleUndo(){
    setStroke(strokes => strokes.slice(0, -1));
    if (strokes.length == 1){
      setText(false);
    }
  }
  return (
    <div className = "guestSignature">
      <button type="button" className="guestSigClearButton"onClick = {handleClear}>Clear</button>
      <button type="button" className = "guestSigUndoButton" onClick = {handleUndo}>Undo</button>
      <svg
        className="guestSignatureBox"
        ref={svgRef}
        width="300"
        height="150"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp = {handlePointerUp}

        style={{ touchAction: 'none' }} 
      >
        
        {strokePaths.map((item, index) => {
          return(
            <path 
              d={getSvgPathFromStroke(item)}
              key = {index}
              fill = "black"
              stroke = "none"
            />
          
          )})
        }
        
        <path
          d={getSvgPathFromStroke(currentStrokePath)}
          fill = "black"
        />
        <text x = "10" y = "25"className ="signaturePlaceholder">{!isSig ? "Sign here!" : ""}</text>
      </svg>
      
    </div>
  )
}