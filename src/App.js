import React, { useEffect, useState } from "react";
import "./style.css";
import Form from './components/Form.js';

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch initial user data
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user) => ({
          name: user.name,
          email: user.email,
          website: user.website,
        }));
        setContacts(formattedData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target; // Reference to the form element
    const name = form[0].value.trim();
    const email = form[1].value.trim();
    const website = form[2].value.trim();

    if (!name || !email || !website) {
      alert('Fields cannot be empty!');
      return;
    }

    const newContact = { name, email, website };
    setContacts((prevContacts) => [...prevContacts, newContact]);

    // Clear form fields
    form.reset();
  };

  return (
    <div className="container">
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="form" onSubmit={handleFormSubmit}>
        <h1>Contact Form</h1>
        <input className="input" placeholder="Name" />
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Website" />
        <button className="btn" type="submit">Add</button>
      </form>
    </div>
  );
}
