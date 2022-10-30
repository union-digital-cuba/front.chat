import React from 'react'

import { ChatSendMessage, ChatMessage, ChatMessagesNotification } from './components'

import { MockMessages } from 'helpers/mocks'
import './style.css'

const ChatMessages = ({ users }) => {
  const RenderMessages = () => {
    return MockMessages.map((chat) => <ChatMessage key={chat.id} chat={chat} />)
  }

  return (
    <div className="chat-messages-container">
      <div className="chat-notification-area">
        <ChatMessagesNotification users={users} />
      </div>
      <div className="messages">{RenderMessages()}</div>
      <div className="send-message">
        <ChatSendMessage />
      </div>
    </div>
  )
}

export default ChatMessages
