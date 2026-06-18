import * as React from "react";
const SVGComponent = (props) => (
  <a href={props.url}>
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          stroke="#FFF"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M3 9a2 2 0 012-2h22a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M3 9l11.862 8.212a2 2 0 002.276 0L29 9"
        />
      </g>
    </svg>
  </a>
);
export default SVGComponent;
