import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

function Main() {
  const [contacts, setContacts] = useState([]);
  // contacts: an array of contacts(the current state) 
  // setContacts: update contacts function(function to update the state)

  useEffect(() => {
    // useEffect: fetch data 
    // runs when the component mounts (first renders)

    fetch(BASE_URL)
  // sends an HTTP request to the API endpoint

      .then(response => response.json())
      // converts the response to JSON format
      .then(data => setContacts(data))
      // updates the contacts state with the fetched data
      .catch(error => console.error('Error fetching contacts:', error));
      // logs an error if there’s an issue with the request.

  }, []);
  // [](empty) passed as the second argument to useEffect 
  // this effect runs only once

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };
// updates the contacts state
// create a new array with the existing contacts (using the spread operator), add the newContact at the end
// passed as a prop to App, use for add new contacts from the form

  return (
    <App contacts={contacts} addContact={addContact} />
  );
  // rendered App component, pass contacts and addContact as props
  // contacts: holds the fetched data to display
  // addContact: add a new contact

}

root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);


