import React from 'react';

export default function Form() {
  return (
    <form className="form">
      <h1>Contact Form</h1>
      <input
        className="input"
        placeholder="Name"/>
      <input
        className="input"
        placeholder="Email"/>
      <input
        className="input"
        placeholder="Website"/>
      <button className="btn" type="submit">Add</button>
    </form> 
  )
}
