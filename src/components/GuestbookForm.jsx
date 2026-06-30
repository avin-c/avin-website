import React from "react";
import { supabase } from "../supabase";
import {useState, useEffect} from "react";
import GuestSignature from "./GuestSignature";
function Guestbook (){
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    async function handleSubmit (e){
        console.log('sigma');
        e.preventDefault();
        const { data, error } = await supabase
            .from("guestbook")
            .insert([
            {
                name,
                message,
            },
            ]);

        if (error) {
            console.log(error);
            return;
        }

        setName("");
        setMessage("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className = "guestformname">
                <label htmlFor="name">Name<span>*</span></label>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                ></input>
            </div>

            <div className = "guestmessage">
                <label htmlFor="message">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                />
            </div>
            <label>Your signature! (or a cool doodle)</label>
            <GuestSignature/>
            <button type="submit">
            Submit
            </button>
            
        </form>
    )
}

export default Guestbook