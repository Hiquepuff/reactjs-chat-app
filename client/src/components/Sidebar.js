import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import LogoutModal from './LogoutModal'
import './rootVariables.css'

const CONVERSATIONS = 'conversations'
const CONTACTS = 'contacts'

export default function Sidebar({id}) {
    const [ activeKey, setActiveKey ] = useState(CONVERSATIONS)
    const [modalOpen, setModalOpen] = useState()
    const conversationOpen = activeKey === CONVERSATIONS
    const [logoutOpen, setLogoutOpen] = useState()


    function closeModal() {
        setModalOpen(false)
        setLogoutOpen(false)
    }

    return (
        <div style={{ minWidth: '35vw', borderRight: '1px solid #ccc'}} className='d-flex flex-column'>
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

                <div className='p-2 border-top border-right small d-flex justify-content-between align-items-center' style={{'borderRight': '1px solid #ccc'}}>
                    <div>
                        Your Id: <span className='text-muted'>{localStorage.getItem('chat-app-id').replace(/"/gi, '')}</span>
                    </div>
                    
                    <button onClick={() => setLogoutOpen(true)} className='m-2 bg-white border-0'>
                        <FontAwesomeIcon icon={faSignOutAlt} style={{fontSize: '1.3rem'}}/>
                    </button>
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

            <Modal show={logoutOpen} onHide={closeModal}>
                <LogoutModal closeModal={closeModal}/>
            </Modal>
        </div>
    )
} 

