import React from "react";

function ProjectNav({currentTab, list, onselect}){

    function handleSelect(item){
        onselect(item);
    }
    return(
        <div className="tabs">
            {list.map((item) => {
                return(
                    <div  className={`tab ${currentTab === item.index ? "activeTab" : "inActiveTab"}`} key={item.index} onClick={() => handleSelect(item.index)} >
                        <h5 >{item.index}</h5>
                    </div>
                );
            })}
        </div>
    );
}
export default ProjectNav