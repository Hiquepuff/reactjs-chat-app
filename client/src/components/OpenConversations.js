import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider'

export default function OpenConversation() {
    const [text, setText] = useState('')
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({smooth: true})
        }
    }, [])
    const { sendMessage, selectedConversation } = useConversations()
    
    function handleSubmit(e) {
        e.preventDefault()
 
        sendMessage(
            selectedConversation.recipients.map(r => r.id),
            text
        )
        setText('')
    }

    return (
        <div className="d-flex flex-column flex-grow-1 ">
            <div className="flex-grow-1 overflow-auto">
                <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index

                        return (
                            <div 
                            key={index}
                            className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            ref={lastMessage ? setRef : null}
                            >
                                <div 
                                className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border' }`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    { message.fromMe ? 'You' : message.senderName }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <InputGroup>
                        <Form.Control  
                            required
                            onChange={e => setText(e.target.value)}
                            as='textarea'
                            value={text}
                            style={{height: '3rem', resize: 'none'}}
                        />
                        <Button type='submit'>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
