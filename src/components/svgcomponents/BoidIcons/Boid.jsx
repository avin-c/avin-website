import * as React from "react";
const Boid = (props) => (
  <svg
    width={props.side}
    height={props.side}
    viewBox="-18 -5 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M -12 -6 Q -14 -9 -10 -8 L 9 -2 Q 16 0 9 2 L -10 8 Q -14 9 -12 6 L -6 1 Q -5 0 -6 -1 Z"
      fill={props.color}
      transform= "rotate(-45)"
    />
  </svg>
);
export default Boid;
