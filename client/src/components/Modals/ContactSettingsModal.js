import React, {useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactsProvider'

export default function ContactSettings({selectedContactId, closeModal}) {
  const [newName, setNewName] = useState('')
  const {removeContact, changeName} = useContacts()
  const [ openWarning, setOpenWarning ] = useState()

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
            

            <button className="btn btn-secondary mt-5"
            >Remove Contact</button>
    </Modal.Body>


    {/* Warning for deleting contact */}
    <Modal show={openWarning} hide={closeModal}>
      <Modal.Header closeButton>
        <h4 className='text-warning m-auto' >Deleting contact</h4>
      </Modal.Header>
      <Modal.Body className='p-5 text-center'>
        <p>Contact ID: {selectedContactId}</p>
        Are you sure you wanna delete this contact?

        <div className="d-flex justify-content-center m-3">
            <Button
            variant='secondary' 
            style={{marginRight: '3rem'}}
            onClick={() => {
              removeContact(selectedContactId)
              closeModal()
            }}
            >Yes</Button>
            <Button onClick={() => closeModal()}>NO</Button>
        </div>
      </Modal.Body>
    </Modal>

    </>
  )
}
