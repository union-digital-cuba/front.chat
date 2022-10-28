import React, { useState } from 'react'

import { Card } from '@nextui-org/react'

import { ChatGroups, ChatMessages, ChatNotification, ChatUsers } from '../components'

import './style.css'

const ChatDesktop = () => {
  const [selectedGroup, SetSelectedGroup] = useState()

  const handleSelectGroup = (id) => {
    SetSelectedGroup(id)
  }

  const ChatComponents = (
    <div className="chat-body-container">
      <div className="chat-groups">
        <ChatGroups handleSelectGroup={handleSelectGroup} />
      </div>
      <div className="chat-messages">
        <ChatMessages />
      </div>
      <div className="chat-users">
        <ChatUsers selectedGroup={selectedGroup} />
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
    </Card>
  )

  return <div className="chat-main-container">{ChatWindow}</div>
}

export default ChatDesktop
