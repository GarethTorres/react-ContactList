import React, { useEffect, useState } from "react";
import "./style.css";
import Form from './components/Form.js';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Tracks the index being edited
  const [editData, setEditData] = useState({ name: '', email: '', website: '' }); // Temporary state for editing

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

  const handleDelete = (index) => {
    setContacts((prevContacts) =>
      prevContacts.filter((_, contactIndex) => contactIndex !== index)
    );
  };

  const handleEditClick = (index) => {
    setIsEditing(index); // Set the index to edit mode
    setEditData(contacts[index]); // Populate the form with existing data
  };

  const handleUpdateSubmit = (e, index) => {
    e.preventDefault();

    if (!editData.name || !editData.email || !editData.website) {
      alert("Fields cannot be empty!");
      return;
    }

    const updatedContacts = [...contacts];
    updatedContacts[index] = editData; // Update the specific user's details
    setContacts(updatedContacts);
    setIsEditing(null); // Exit edit mode
    setEditData({ name: '', email: '', website: '' }); // Clear edit form
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.website}</td>
              <td>
                <button
                  className="btn-update"
                  onClick={() => handleEditClick(index)}
                >
                  Update
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing !== null ? (
        <form
          className="form"
          onSubmit={(e) => handleUpdateSubmit(e, isEditing)}
        >
          <h1>Update Contact</h1>
          <input
            className="input"
            placeholder="Name"
            value={editData.name}
            onChange={(e) =>
              setEditData((prevData) => ({ ...prevData, name: e.target.value }))
            }
          />
          <input
            className="input"
            placeholder="Email"
            value={editData.email}
            onChange={(e) =>
              setEditData((prevData) => ({ ...prevData, email: e.target.value }))
            }
          />
          <input
            className="input"
            placeholder="Website"
            value={editData.website}
            onChange={(e) =>
              setEditData((prevData) => ({ ...prevData, website: e.target.value }))
            }
          />
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      ) : (
        <form className="form" onSubmit={handleFormSubmit}>
          <h1>Contact Form</h1>
          <input className="input" placeholder="Name" />
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Website" />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      )}
    </div>
  );
}
