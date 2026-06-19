import React from "react";

function Navbar (props){
    const sectionObject = props.list;
    
    return(
        <div className="navComponent">
            <nav>
                <ul id = "siteNav">
                {sectionObject.map((item) => {
                    return (
                            <li className = "navItems" key = {item.label}>
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