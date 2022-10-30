import React from 'react'

import { Loading } from '@nextui-org/react'
import { ChatSendMessage, ChatMessage, ChatMessagesNotification } from './components'

import './style.css'

const ChatMessages = ({ users, messages }) => {
  const RenderMessages = () => {
    return messages.loading ? (
      <Loading color="error">Loading...</Loading>
    ) : (
      messages.data.map((chat) => <ChatMessage key={chat.id} chat={chat} />)
    )
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
