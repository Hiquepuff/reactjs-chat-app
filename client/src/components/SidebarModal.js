import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import './rootVariables.css'

const CONVERSATIONS = 'conversations'
const CONTACTS = 'contacts'

export default function SidebarModal() {
    const [ activeKey, setActiveKey ] = useState(CONVERSATIONS)
    const [modalOpen, setModalOpen] = useState()
    const conversationOpen = activeKey === CONVERSATIONS
    
    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div className='d-flex flex-column w-100' >
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant='tabs' className='d-flex justify-content-center' style={{height: '3rem'}}>
                    <Nav.Item>
                        <Nav.Link style={{'color': 'black'}} eventKey={CONVERSATIONS}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{'color': 'black'}} eventKey={CONTACTS}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className='bg-light border-right overflow-auto flex-grow-1'>
                    <Tab.Pane eventKey={CONVERSATIONS}>
                        <Conversations/>
                    </Tab.Pane>

                    <Tab.Pane eventKey={CONTACTS}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className='p-2 border-top border-right small' style={{'borderRight': '1px solid #ccc'}}>
                    Your Id: <span className='text-muted'>{localStorage.getItem('chat-app-id').replace(/"/gi, '')}</span>
                </div>
                <Button style={{height: '3rem'}} className='m-2 bg-grey-light border-0' onClick={() => setModalOpen(true)}>
                    New { conversationOpen ? 'Conversations' : 'Contacts'}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {conversationOpen ?
                    <NewConversationModal closeModal={closeModal}/> :
                    <NewContactModal closeModal={closeModal}/>    
                }
            </Modal>
        </div>
    )
} 
