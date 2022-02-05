import React from 'react';
import { ListGroup } from 'react-bootstrap';
import {useContacts} from '../context/ContactsProvider'

export default function Contacts() {
  const {contacts} = useContacts()

  return (
    <ListGroup variant='flush' style={{'borderBottom': '1px solid #ccc'}}>
      {contacts.map(cont => (
        <ListGroup.Item key={cont.id} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {cont.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
