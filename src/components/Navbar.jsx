import React from "react";
import { useState , useEffect} from "react";
function Navbar (props){
    const sectionObject = props.list;
    const [activePage, setPage] = useState(props.list[0].idName);


    useEffect(() => {
        
        const handlePageCross = (entries) => {
            entries.forEach((entry) => {
                // If this specific element has entered our viewport target zone
                if (entry.isIntersecting) {
                    // Update our React state with the HTML id attribute of that element
                    setPage(entry.target.id);
                }
            });
        };
        const options = {rootMargin: "-30% 0px -60% 0px"};
        
        
        const observer = new IntersectionObserver(handlePageCross, options);
        const sections = document.querySelectorAll(".content");
        sections.forEach((section) => observer.observe(section));
        return () => {
            observer.disconnect();
        };
        
    },[])
    
    const [isHovered, setExpand] = useState(false);
    function handleCollapse(){
        setExpand(false);
    }
    
    function handleExpand (){
        setExpand(true);
    }
    console.log("Current Hover State:", isHovered);
    return(
        <div className="navComponent">
            <nav>
                <ul id = "siteNav" onMouseEnter={handleExpand} onMouseLeave={handleCollapse} className={`${isHovered ? "navExpand" : "navCollapse"}`}>
                {sectionObject.map((item) => {
                    return (
                            <li className={`navItems ${activePage === item.idName ? "active" : ""}`} key = {item.label}>
                                <a className= "navItemLinks" href={"#" + item.idName}>
                                    <span className = "navItemText">{item.label}</span>
                                </a>
                            </li>
                    );
                })
                }
                    
                    
                </ul>
            </nav>
        </div>
        
    );
}

export default Navbar