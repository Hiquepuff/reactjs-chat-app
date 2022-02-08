import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faEllipsisV, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Form, InputGroup, Button, Modal } from 'react-bootstrap'
import { useConversations } from '../../contexts/ConversationsProvider'
import SidebarModal from '../Modals/SidebarModal'
import SeeUsersModal from '../Modals/SeeUsersModal'
import './OpenConversations.css'
import '../../General.css'

export default function OpenConversation({screenWidth}) {
    const [ modalOpen, setModalOpen] = useState() // For the sidebar modal
    const [ seeUsersOpen, setSeeUsersOpen ] = useState() // For seeing the users
    const [text, setText] = useState('')
    const setRef = useCallback(node => {
        if (node) node.scrollIntoView(false)
    }, [])
    const { sendMessage, selectedConversation } = useConversations()

    if (screenWidth <= 480) {
        document.querySelector('body').style.overflowY = 'hidden'
        document.querySelector('html').style.overflowY = 'hidden'
    }

    function handleSubmit(e) {
        if (e) e.preventDefault()
        // Send message if there is at least one character
        if (text.match(/^\s*\S+/)) {
            sendMessage(
                selectedConversation.name,
                selectedConversation.recipients.map(r => r.id),
                text.trim()
            )
        }
        setText('')
        document.querySelector('.message-input').focus()
    }

    function closeModal() { setModalOpen(false) }

    // Send message when enter key is pressed
    setTimeout(() => {
        const textarea = document.querySelector('.form-control')
        const sendButton = document.querySelector('#send-btn')
        
        textarea.addEventListener('keydown', e => {
            if (e.key === 'Enter') sendButton.click()
        })
    }, 100)

    return (
        <>
        <div className="conversation-container bg-less-light d-flex flex-column flex-grow-1 ">
            <div  style={{height: '3rem'}} className="bg-grey-primary mt-0 w-100 text-white p-3 d-flex align-items-center justify-content-between">
                
                <button 
                className='arrow rounded-circle border-0'
                style={{'marginRight': '1rem'}}
                onClick={() => setModalOpen(true)}
                 >
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                
                <div className='top-chat-bar' style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    {selectedConversation.name}
                </div>

                <div>
                <button 
                className='border-0 bg-grey-primary' 
                style={{'marginRight': '.5rem'}}
                onClick={() => setSeeUsersOpen(true)}
                >
                    <FontAwesomeIcon icon={faEllipsisV} className='text-white'/>
                </button>
                </div>
                
            </div>


            <div className="bg-less-light flex-grow-1 overflow-auto">
                <div className='bg-less-light d-flex flex-column align-items-start justify-content-end px-3'>
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index

                        return (
                            <div 
                            key={index}
                            className={`message-container my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            ref={lastMessage ? setRef : null}
                            >
                                <pre 
                                style={{maxWidth: '20rem', fontFamily: 'Poppins', whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}
                                className={`rounded p-2 text-white ${message.fromMe ? 'bg-grey-primary' : 'bg-grey-light' }`}>
                                    {message.text}
                                </pre>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    { message.fromMe ? 'You' : message.senderName }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Form onSubmit={handleSubmit} className='message-form'>
                <Form.Group className='m-2'>
                    <InputGroup>
                        <Form.Control  
                            required
                            onChange={e => setText(e.target.value)}
                            as='textarea'
                            value={text}
                            style={{height: '3rem', resize: 'none'}}
                            className='message-input'
                        />
                        <Button style={{'border': 'none', 'backgroundColor': '#4f5b62'}} type='submit' id='send-btn'>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>

                         
        </div>
        
        <Modal className='sidebar-modal' style={{position: 'fixed', top: '3rem'}} show={modalOpen} onHide={closeModal}>
            <SidebarModal closeModal={closeModal}/>
        </Modal>

        <Modal show={seeUsersOpen} onHide={() => setSeeUsersOpen(false)}>
            <SeeUsersModal 
            closeModal={() => setSeeUsersOpen(false)}
            users={selectedConversation.recipients}
             />
        </Modal>
        </>
    )
}