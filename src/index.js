import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

function Main() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => setContacts(data))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  return (
    <App contacts={contacts} addContact={addContact} />
  );
}

root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);
