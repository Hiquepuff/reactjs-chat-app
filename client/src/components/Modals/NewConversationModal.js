import React, {useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactsProvider'
import { useConversations } from '../../contexts/ConversationsProvider'

export default function NewConversationModal({closeModal}) {
  const {contacts} = useContacts()
  const [selectedContactIds, setSelectedContactId ] = useState([])
  const {createConversation} = useConversations()
  const [ conversationName, setConversationName] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedContactIds.length > 0) createConversation(selectedContactIds, conversationName)
    else (alert('Add a contact before creating a conversation'))
    
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
    </>
  )
}
