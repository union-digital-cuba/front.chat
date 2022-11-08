import React, { useState, useEffect, useRef } from 'react'

import { Loading } from '@nextui-org/react'
import { ChatSendMessage, ChatMessage, ChatNotificationArea } from './components'
import { MessageAPI } from 'api/Messages'
import { HelperDate } from 'helpers/date'
import { CustomTypes } from 'common'
import { CustomPopUp } from 'components'
import Console from 'helpers/console'

import './style.css'
import Socket from 'helpers/sockets'

const ChatMessages = ({ user, selected }) => {
  const scrollRef = useRef()
  const [messages, setMessages] = useState({ loading: true, data: [] })

  useEffect(() => {
    Socket.SubscribeToMessages((data) => setMessages({ loading: false, data: [...messages.data, data] }))
  })

  useEffect(() => {
    Console.Log('useEffect -> Scroll al Mensaje')
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const LoadMessages = async () => {
      try {
        Console.Log('useEffect -> Cargando mensajes')
        if (selected.data) {
          const { statusCode, response } =
            selected.type === CustomTypes.ChatType.group
              ? await MessageAPI.GetMessagesFromGroup({ groupId: selected.data.id })
              : await MessageAPI.GetMessagesFromUser({ sender: user.id, receiver: selected.data.id })
          if (statusCode === 200) setMessages({ loading: false, data: response })
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `LoadUsersFromGroup... ${error}`)
      }
    }
    LoadMessages()
  }, [selected])

  const handleSendMessage = async (msg) => {
    if (selected.data) {
      const messageToSend = {
        message: msg,
        sender: user.id,
        receiver: selected.data.id,
        type: selected.type,
        date: HelperDate.getNow(),
      }
      const { statusCode, response } = await MessageAPI.SendMessage({ message: messageToSend })
      if (statusCode === 200) {
        Socket.SendMessage({ data: response, type: messageToSend.type })
        setMessages({ loading: false, data: [...messages.data, response] })
      }
    }
  }

  const RenderMessages = () => {
    return messages.loading ? (
      <Loading color="error">Loading...</Loading>
    ) : (
      messages.data.map((chat, index) => (
        <div ref={scrollRef} key={index}>
          <ChatMessage chat={chat} selected={selected} />
        </div>
      ))
    )
  }

  return (
    <div className="chat-messages-container">
      <div className="chat-notification-area">
        <ChatNotificationArea selected={selected} />
      </div>
      <div className="messages">{RenderMessages()}</div>
      <div className="send-message">
        <ChatSendMessage handleSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatMessages
