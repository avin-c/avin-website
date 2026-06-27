import React from "react";
import { supabase } from "../supabase";
import {useState, useEffect} from "react";
import GuestSignature from "./GuestSignature";
function Guestbook (){
    function handleSubmit (){
        alert("submitted");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className = "guestformname">
                <label htmlFor="name">Name<span>*</span></label>
                <input id = "name" name = "name" placeholder='Your name'></input>
            </div>

            <div className = "guestmessage">
                <label htmlFor="message">Message</label>
                <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                />
            </div>
            <button type="submit">
            Submit
            </button>
            <GuestSignature/>
        </form>
    )
}

export default Guestbook