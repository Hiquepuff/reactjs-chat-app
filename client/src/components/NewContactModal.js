import React, { useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'

export default function NewContactModal({closeModal}) {
    const idRef = useRef();
    const nameRef = useRef()
    const { createContact } = useContacts()

    function handleSubmit(e) {
        e.preventDefault();
        createContact(idRef.current.value.trim(), nameRef.current.value)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Id</Form.Label>
                        <Form.Control type='text' ref={idRef} required />
                    </Form.Group>
                    <Form.Group className='mt-4'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' ref={nameRef} required />
                    </Form.Group>
                    
                    <Button className="btn btn-secondary mt-4" type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}