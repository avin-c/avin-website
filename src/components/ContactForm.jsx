import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xrewqopo");
  if (state.succeeded) {
      return <p>Thanks for contacting me! I will get back to you shortly.</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name<span>*</span></label>
          <input id = "name" name = "name" placeholder='Your name'></input>
        </div>
        <div>
          <label htmlFor="email">
          Email Address<span>*</span>
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
        </div>
        <div className = "textarea">
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
        </div>
        <button type="submit" disabled={state.submitting}>
        Submit
        </button>
    </form>
  );
}

export default ContactForm