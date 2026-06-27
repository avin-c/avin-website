import React from "react";
import GuestbookDisplay from "./GuestbookDisplay";
function Guestbook (){
    console.log("guestbook");
    return(
        <div className = "guestbook">
  
            <GuestbookDisplay/>
        </div>
    );
}

export default Guestbook