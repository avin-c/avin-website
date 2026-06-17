import * as React from "react";
import CodeProgress from "./CodeProgress";
const DropdownSvg = ({ upDown, ...props }) => (
    upDown? (
        <svg
            width={16}
            height={16}
            fill="white"
            viewBox="-10 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(-1,0,0,-1,0,0)"
            {...props}
        >
            <title>{"dropdown"}</title>
            <path d="m18.813 11.406-7.906 9.906c-.75.906-1.906.906-2.625 0L.376 11.406c-.75-.938-.375-1.656.781-1.656h16.875c1.188 0 1.531.719.781 1.656" />
        </svg>
    )
    :(
        <svg
            width={16}
            height={16}
            fill="white"
            viewBox="-10 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(-1,0,0,1,0,0)"
            {...props}
        >
            <title>{"dropdown"}</title>
            <path d="m18.813 11.406-7.906 9.906c-.75.906-1.906.906-2.625 0L.376 11.406c-.75-.938-.375-1.656.781-1.656h16.875c1.188 0 1.531.719.781 1.656"/>
        </svg>
    )
);
export default DropdownSvg;
