import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:4000'
const socket = io.connect(ENDPOINT)

const Test = () => {
  const [messageReceive, setMessageReceive] = useState('')
  const [messageSend, setMessageSend] = useState('')

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceive(data)
    })
  }, [socket])

  const sendMessage = () => {
    socket.emit('send_message', messageSend)
  }

  return (
    <div>
      <input
        placeholder="...Message"
        onChange={(event) => {
          setMessageSend(event.target.value)
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Messages:</h1>
      <p>{messageReceive}</p>
    </div>
  )
}

export default Test
