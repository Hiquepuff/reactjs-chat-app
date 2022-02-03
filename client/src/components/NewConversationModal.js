import React, {useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'
import { useConversations } from '../context/ConversationsProvider'

export default function NewConversationModal({closeModal}) {
  const {contacts} = useContacts()
  const [selectedContactIds, setSelectedContactId ] = useState([])
  const {createConversation} = useConversations()

  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedContactIds)
    closeModal()
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
              
            <Button type='submit'>Create</Button>
          </Form>
      </Modal.Body>
    </>
  )
}
