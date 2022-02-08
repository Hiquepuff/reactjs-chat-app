import React from 'react';
import { Modal } from 'react-bootstrap';

export default function SeeUsersModal({users, closeModal}) {
    const contacts = JSON.parse(localStorage.getItem('chat-app-contacts'))
    console.log(contacts)
    const usersInRoom = users.map(u => {
        const contact = (contacts.filter(contact => contact.id === u.id))[0]
        
        if (contact) return contact.name
        return u.id
    })

  return (
      <>
        <Modal.Header className='m-auto w-100' closeButton>
            Users in the room:
        </Modal.Header>
        <Modal.Body>
            {usersInRoom.map(u => <li>{u}</li>)}
        </Modal.Body>
      </>
  )
}
