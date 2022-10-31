import React, { useState, useEffect } from 'react'

import { Loading } from '@nextui-org/react'
import { ChatSendMessage, ChatMessage, ChatMessagesNotification } from './components'
import { MessageAPI } from 'api/Messages'
import { MockMessages } from 'helpers/mocks'

import './style.css'
import { HelperDate } from 'helpers/date'

const ChatMessages = ({ users, user, selected, kind }) => {
  const [messages, setMessages] = useState({ loading: true, data: [] })

  useEffect(() => {
    const LoadMessages = async () => {
      setMessages({ loading: false, data: MockMessages })
    }
    LoadMessages()
  }, [])

  const handleSendMessage = async (msg) => {
    const messageStructure = {
      message: msg,
      sender: user.id,
      receiver: selected.id,
      type: kind,
      date: HelperDate.getNow(),
    }
    //enviar mensaje
    const { statusCode, response } = await MessageAPI.SendMessage(messageStructure)
    if (statusCode === 200) {
      setMessages([...messages, response])
    }
  }

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
        <ChatSendMessage handleSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatMessages
