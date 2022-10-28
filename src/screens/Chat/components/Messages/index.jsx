import React from 'react'

import { ChatSendMessage, ChatMessage } from '../../components'

// import { Text } from '@nextui-org/react'
import './style.css'
import { MockMessages } from 'helpers/mocks'

const ChatMessages = () => {
  const RenderMessages = () => {
    return MockMessages.map((message) => <ChatMessage key={message.id} message={message} />)
  }

  return (
    <div className="chat-messages-container">
      <div className="messages">{RenderMessages()}</div>
      <div className="send-message">
        <ChatSendMessage />
      </div>
    </div>
  )
}

export default ChatMessages
