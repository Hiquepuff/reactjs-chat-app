import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversations/OpenConversations'
import { useConversations } from '../contexts/ConversationsProvider'
import SidebarModal from './Modals/SidebarModal'

export default function Dashboard({id}) {
    const { selectedConversation } = useConversations()
    const [ screenWidth, setScreenWidth ] = useState(window.innerWidth)
    
    function handleResize() {
        setScreenWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [screenWidth])

    return (
        <div className='d-flex' style={{ height: '100vh'}}>
            {screenWidth >= 750 ? <Sidebar id={id} /> : null}
            {selectedConversation ? <OpenConversation/> :
                screenWidth <= 750 ? <SidebarModal/> : null
            }
        </div>
    )
}
