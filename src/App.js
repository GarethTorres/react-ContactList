import React from "react";
import "./style.css";
import Form from './components/Form.js';

export default function App({ contacts, addContact }) {
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

          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.website}</td>
            </tr>
          ))}
          {/* update contents */}
          
        </tbody>
      </table>
      <Form addContact={addContact} />
    </div>
  );
}

