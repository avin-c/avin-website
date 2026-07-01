import React from "react";
import { supabase } from "../supabase";
import {useState, useEffect} from "react";
import GuestSignature from "./GuestSignature";
function Guestbook (props){
    const [strokes, setStroke] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [nameError, setNameError] = useState(false);
    async function handleSubmit (e){
        console.log('sigma');
        e.preventDefault();
        if (name.trim() === '') {
            alert('Please fill out the name field.');
            return;
        }
        const { data, error } = await supabase
            .from("guestbook")
            .insert([
            {
                name,
                message,
                signature: strokes
            },
            ]);

        if (error) {
            console.log(error);
            return;
        }

        setName("");
        setMessage("");
        props.handleRefresh();
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
            <GuestSignature strokes = {strokes} setStroke={setStroke} {...props}/>
            <button type="submit" >
            Submit
            </button>
            
        </form>
    )
}

export default Guestbook