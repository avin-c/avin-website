import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xrewqopo");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id = "name" name = "name" placeholder='Your name'></input>
        <label htmlFor="email">
        Email Address
        </label>
        <input
        id="email"
        placeholder = "youremail@example.com" 
        type="email" 
        name="email"
        />
        <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
        />
        <label htmlFor="message">Message</label>
        <textarea
        id="message"
        name="message"
        placeholder="Write your message here..."
        />
        <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
        />
        <button type="submit" disabled={state.submitting}>
        Submit
        </button>
    </form>
  );
}

export default ContactForm