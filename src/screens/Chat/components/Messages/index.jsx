import React, { useState, useEffect, useRef } from 'react'

import { Loading } from '@nextui-org/react'
import { ChatSendMessage, ChatMessage, ChatMessagesNotification } from './components'
import { MessageAPI } from 'api/Messages'
import { HelperDate } from 'helpers/date'
import { CustomTypes } from 'common'
import { CustomPopUp } from 'components'
import Console from 'helpers/console'

import './style.css'

const ChatMessages = ({ user, selected, socket }) => {
  const scrollRef = useRef()
  const [messages, setMessages] = useState({ loading: true, data: [] })
  const [arrivalMessage, setArrivalMessage] = useState()

  //cuando recivo algo del socket lo ponto en arrival
  useEffect(() => {
    if (socket.current) {
      socket.current.on('message-recieve', (data) => {
        Console.Log('useEffect -> Recivido un nuevo mensaje')
        setArrivalMessage(data)
      })
    }
  }, [])

  //adiciono el arrival a los mensajes
  useEffect(() => {
    Console.Log('useEffect -> Almacenar nuevo mensaje')
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  //me desplazo al mensaje
  useEffect(() => {
    Console.Log('useEffect -> Scroll al Mensaje')
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  //cargar todos los mensajes del chat
  useEffect(() => {
    const LoadMessages = async () => {
      try {
        Console.Log('useEffect -> Cargando mensajes')
        if (selected.data) {
          const { statusCode, response } =
            selected.type === CustomTypes.ChatType.group
              ? await MessageAPI.GetMessagesFromGroup({ sender: user.id, receiver: selected.data.id })
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
    const messageToSend = {
      message: msg,
      sender: user.id,
      receiver: selected.data.id,
      type: selected.type,
      date: HelperDate.getNow(),
    }
    socket.current.emit('send-message', messageToSend)
    const { statusCode, response } = await MessageAPI.SendMessage({ message: messageToSend })
    if (statusCode === 200) {
      setMessages({ loading: false, data: [...messages.data, response] })
    }
  }

  const RenderMessages = () => {
    return messages.loading ? (
      <Loading color="error">Loading...</Loading>
    ) : (
      messages.data.map((chat, index) => <ChatMessage key={index} chat={chat} />)
    )
  }

  return (
    <div className="chat-messages-container">
      <div className="chat-notification-area">
        <ChatMessagesNotification selected={selected} />
      </div>
      <div className="messages">{RenderMessages()}</div>
      <div className="send-message">
        <ChatSendMessage handleSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatMessages
