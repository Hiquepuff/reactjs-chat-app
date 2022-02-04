import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider';

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item 
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
          className={`border-bottom border-secondary ${conversation.selected ? 'bg-grey-light' : ''}`}
        >
          {conversation.recipients.map(r => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}