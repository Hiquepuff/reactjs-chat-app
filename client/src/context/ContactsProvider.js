import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  function createContact(id, name) {
    setContacts(prevContacts => {
      return [...prevContacts, {id, name}]
    })
  }

  function removeContact(id) {
    const newContacts = []
    setContacts(prevContacts => {
      prevContacts.forEach(contact => {
        if (contact.id !== id &&
          contact.id !== newContacts[newContacts.length - 1]) {
          newContacts.push(contact)
        }
      })
      return newContacts
    })
  }

  function changeName(id, newName) {
    if (newName) {
      setContacts(prevContacts => {
        return (prevContacts.map(contact => {
          if (contact.id === id) {
            contact.name = newName
          }
          return contact
        }))
      })
    }
    
  }

  return (
      <ContactsContext.Provider value={{ contacts, createContact, removeContact, changeName }}>
        {children}
      </ContactsContext.Provider>
  )
}