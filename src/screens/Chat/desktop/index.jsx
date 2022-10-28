import React from 'react'

import { Card, Row, Button } from '@nextui-org/react'

import { ChatGroups, ChatMessages, ChatNotification, ChatUsers } from '../components'

import './style.css'

const ChatDesktop = () => {
  const ChatComponents = (
    <div className="chat-body-container">
      <div className="chat-groups">
        <ChatGroups />
      </div>
      <div className="chat-messages">
        <ChatMessages />
      </div>
      <div className="chat-users">
        <ChatUsers />
      </div>
    </div>
  )

  const ChatWindow = (
    <Card variant="bordered" isHoverable>
      <Card.Header css={{ jc: 'center' }}>
        <ChatNotification />
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: '$2' }}>{ChatComponents}</Card.Body>
      <Card.Footer css={{ ai: 'unset' }}>
        <Row justify="flex-end">
          <Button size="sm" light>
            Cancel
          </Button>
          <Button size="sm">Agree</Button>
        </Row>
      </Card.Footer>
    </Card>
  )

  return <div className="chat-main-container">{ChatWindow}</div>
}

export default ChatDesktop
