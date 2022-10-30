import React from 'react'

const ChatMessage = ({ chat }) => {
  return <div key={chat.id}>{chat.message}</div>
}

export default ChatMessage
