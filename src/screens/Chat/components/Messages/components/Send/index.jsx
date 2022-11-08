import React, { useState } from 'react'

import { Input, Button } from '@nextui-org/react'
import { SendIcon } from 'components/Icons'

import * as IconlyPack from 'react-iconly'

import './style.css'

const ChatSendMessage = ({ handleSendMessage }) => {
  const [message, setMessage] = useState('')

  const onSendMessage = () => {
    if (message) {
      handleSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="send-message-container">
      <div className="send-message-input">
        <Input
          css={{ w: '100%' }}
          clearable
          contentRightStyling={false}
          placeholder="Type your message..."
          contentLeft={
            <Button
              className="send-button"
              auto
              color="error"
              icon={<IconlyPack.Search set="bulk" size={16} />}
              onClick={() => onSendMessage()}
            />
          }
          contentRight={
            <Button
              className="send-button"
              auto
              color="error"
              icon={<SendIcon className="send-button-icon" fill="currentColor" filled size={16} />}
              onClick={() => onSendMessage()}
            />
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            e.key === 'Enter' && onSendMessage(e.value)
          }}
          // onPointerDown={() => alert('entrado')}
        />
      </div>
    </div>
  )
}

export default ChatSendMessage
