import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversations/OpenConversations'
import { useConversations } from '../context/ConversationsProvider'

export default function Dashboard({id}) {
    const { selectedConversation } = useConversations()
    const [ screenWidth, setScreenWidth ] = useState(window.innerWidth)
    
    function handleResize() {
        setScreenWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [screenWidth])

    {if (screenWidth >= 750) {
        return (
        <div className='d-flex' style={{ height: '100vh'}}>
            <Sidebar id={id} />
            {selectedConversation && <OpenConversation />}
        </div>
    )
    } else {
        return (
            <div className='d-flex' style={{ height: '100vh'}}>
            {selectedConversation && <OpenConversation/>}
            </div>
        )
    }}

    
}
