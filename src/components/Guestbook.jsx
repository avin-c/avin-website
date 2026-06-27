import React from "react";
import GuestbookDisplay from "./GuestbookDisplay";
import GuestbookForm from "./GuestbookForm";
function Guestbook (){
    console.log("guestbook");
    return(
        <div className = "guestbook">
            <GuestbookForm/>
            <GuestbookDisplay/>
        </div>
    );
}

export default Guestbook