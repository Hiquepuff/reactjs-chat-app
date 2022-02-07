import React, { useState } from 'react';
import { ListGroup, Modal } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import ContactSettingsModal from './Modals/ContactSettingsModal'

export default function Contacts() {
  const {contacts} = useContacts()
  const [modalOpen, setModalOpen] = useState()
  const [selectedContactId, setSelectedContactId] = useState('')
  
  function closeModal() {setModalOpen(false)}

  return (
    <>
    <ListGroup variant='flush' style={{'borderBottom': '1px solid #ccc'}}>
      {contacts.map(cont => (
        <ListGroup.Item 
        key={cont.id} 
        style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
        className='d-flex justify-content-between'
        >
          <div>
            {cont.name}
          </div>

          <button
          className='border-0 bg-white'
          onClick={() => {
            setModalOpen(true)
            setSelectedContactId(cont.id)
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </ListGroup.Item>
      ))}
    </ListGroup>

    <Modal style={{position: 'fixed', top: '3rem', width: '10rem !important'}} show={modalOpen} onHide={closeModal}>
            <ContactSettingsModal closeModal={closeModal} selectedContactId={selectedContactId}/>
    </Modal> 
    </>
  )
}
