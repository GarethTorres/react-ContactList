import React, { useState } from 'react';

export default function Form({ addContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || website === '') {
      alert("Fields cannot be empty!");
      // condition check

    } else {
      const newContact = {
        // contact info update

        id: Math.random(),  
        // temporary ID
        name,
        email,
        website


      };
      addContact(newContact);
      setName('');
      setEmail('');
      setWebsite('');

    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Contact Form</h1>
      <input
        className="input"
        placeholder="Name"

        value={name}
        onChange={(e) => setName(e.target.value)}
        // changes update
      />
      <input
        className="input"
        placeholder="Email"

        value={email}
        onChange={(e) => setEmail(e.target.value)}

      />
      <input
        className="input"
        placeholder="Website"

        value={website}
        onChange={(e) => setWebsite(e.target.value)}

      />

      <button className="btn" type="submit">Add</button>

    </form>
  );
}
