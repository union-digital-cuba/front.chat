import React from 'react'

import './style.css'

const ChatDesktop = () => {
  return (
    <div className="main-container">
      <div className="room-user-container">
        <div className="room-container"></div>
        <div className="user-container"></div>
      </div>
      <div className="chat-container"></div>
      <div className="users-container"></div>
    </div>
  )
}

export default ChatDesktop
