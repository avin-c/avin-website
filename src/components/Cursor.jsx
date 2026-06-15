import { useEffect, useRef } from "react";

function Cursor (){
    const mouse = useRef({ x: 0, y: 0 });
    const blob = useRef(null);
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
    };

    }, []);
    
    useEffect(() => {
    const animate = () => {
        const current = pos.current;
        const target = mouse.current;

        current.x += (target.x - current.x) * 0.08;
        current.y += (target.y - current.y) * 0.08;

        if (blob.current) {
        blob.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
        }

        requestAnimationFrame(animate);
    };

    animate();
    }, []);    
    
    return (
    <div
        ref={blob}
        className="cursor-blob"
    />
    );    
}

export default Cursor;