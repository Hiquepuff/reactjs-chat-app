import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

export default function Login({ onIdSubmit }) {
    const idRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        onIdSubmit(idRef.current.value)
    }

    function generateId() {
        onIdSubmit(uuid(idRef.current.value))
    }

    return (
        <Container className='align-items-center d-flex' style={{ height: '100vh'}}>
            <Form onSubmit={handleSubmit} 
            className='p-4 rounded mx-auto shadow'
            style={{ width: '25rem'}}
            >
                <Form.Group style={{'marginBottom': '.5rem'}}  className='mb-3'>
                    <Form.Label>Enter Your Id</Form.Label>
                    <Form.Control type='text' ref={idRef} required/>
                </Form.Group>
                <Button type='submit' variant='dark' style={{'marginRight': '.5rem'}}>Login</Button>
                <Button onClick={generateId} variant='secondary'>Crete New Id</Button>
            </Form>
        </Container>
    )
}