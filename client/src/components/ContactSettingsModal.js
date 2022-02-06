import React, {useState} from 'react';
import {Modal, Form } from 'react-bootstrap'
import {useContacts} from '../context/ContactsProvider'

export default function ContactSettings({selectedContactId, closeModal}) {
  const [newName, setNewName] = useState('')
  const {removeContact, changeName} = useContacts()

  function handleSubmit(e) {
    e.preventDefault()
    changeName(selectedContactId, newName)
    closeModal()
  }

  return (
    <>
    <Modal.Header closeButton>Contact Settings</Modal.Header>

    <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Change name</Form.Label>
              <Form.Control
              onChange={e => setNewName(e.target.value)}
              value={newName}
              />

              <button 
              type='submit'
              className='btn btn-dark mt-3'
              >
                Change
              </button>
            </Form.Group>
          </Form>
            

            <button
            className="btn btn-secondary mt-5"
            onClick={() => {
              const answer = prompt('You are about to delete this contact\nAre you sure?')
              if (answer.match(/y|yes/ig)) {
                removeContact(selectedContactId)
                closeModal()
              }
              }}
            >Remove Contact</button>
    </Modal.Body>

    </>
  )
}
