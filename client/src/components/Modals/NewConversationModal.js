import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactsProvider'
import { useConversations } from '../../contexts/ConversationsProvider'

export default function NewConversationModal({closeModal}) {
  const {contacts} = useContacts()
  const [selectedContactIds, setSelectedContactId ] = useState([])
  const {createConversation} = useConversations()
  const [ conversationName, setConversationName] = useState('')
  const [ openWarning, setOpenWarning ] = useState()

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedContactIds.length > 0) {
      createConversation(selectedContactIds, conversationName)
      closeModal()
    }
    else {setOpenWarning(true)}
  }

  function handleCheckboxChange(contId) {
    setSelectedContactId(prevSelContId => {
      if (prevSelContId.includes(contId)) {
        return prevSelContId.filter(prevCont => {
          return prevCont !== contId
        })
      } else {
        return [...prevSelContId, contId]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>

      <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control required
               value={conversationName}
               onChange={e => setConversationName(e.target.value)}
               placeholder='Conversation Name' className='mb-4'>
            </Form.Control>
            </Form.Group>
            {contacts.map(cont => (
              <Form.Group controlId={cont.id} key={cont.id}>
                <Form.Check
                  type='checkbox'
                  value={selectedContactIds.includes(cont.id)}
                  label={cont.name}
                  onChange={() => handleCheckboxChange(cont.id)}
                />
              </Form.Group>
            ))}
              
            <Button className='mt-3 btn-secondary' type='submit'>Create</Button>
          </Form>
      </Modal.Body>
            
      {/* Alert for when someone tries to create conversation without contacts */}
      <Modal show={openWarning} onHide={() => {
        setOpenWarning(false)
        closeModal()
      }}>
              <Modal.Header closeButton>
                <h4 className='text-warning mx-auto' >Unable to create conversation</h4>
              </Modal.Header>
              <Modal.Body className='p-5 text-center'>
                You need to add at least one contact
              </Modal.Body>
      </Modal>
    </>
  )
}
