import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

export default function NewConversationModal({closeModal}) {
  function logout() {
    localStorage.removeItem('chat-app-conversations')
    localStorage.removeItem('chat-app-contacts')
    localStorage.removeItem('chat-app-id')

    window.location.reload()
  }

  return (
    <>
      <Modal.Header closeButton style={{fontSize: '1.5rem'}} className='text-danger'>
        <div style={{marginLeft: 'auto'}}>
        Logout
        <FontAwesomeIcon style={{marginLeft: '1.5rem'}} icon={faExclamationTriangle} />
        </div>
      </Modal.Header>

      <Modal.Body>
        <h4 style={{textAlign: 'justify'}} className='p-4'>
            If you logout all your contacts and conversations will be lost.
        </h4>

        <p className="text-center">Are you sure you wanna logout?</p>
        
        <div className="d-flex justify-content-center mb-3">
            <Button
            variant='secondary' 
            style={{marginRight: '3rem'}}
            onClick={() => logout()}
            >Yes</Button>
            <Button onClick={() => closeModal()}>NO</Button>
        </div>
        
      </Modal.Body>
    </>
  )
}
