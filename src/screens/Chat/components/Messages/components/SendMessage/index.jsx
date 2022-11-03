import React, { useRef } from 'react'

import { Input, Button } from '@nextui-org/react'
// import SendButton from './components'
import { SendIcon } from 'components/Icons'
// import { CustomTypes } from 'common'

import './style.css'

const ChatSendMessage = ({ handleSendMessage }) => {
  const inputReference = useRef()

  const onSendMessage = () => {
    if (inputReference.current) {
      handleSendMessage(inputReference.current)
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
          contentRight={
            <Button
              className="send-button"
              auto
              color="error"
              icon={<SendIcon className="send-button-icon" fill="currentColor" filled size={16} />}
              onClick={() => onSendMessage()}
            />
          }
          onChange={(e) => {
            inputReference.current = e.target.value
          }}
          // onPointerDown={() => alert('entrado')}
        />
      </div>
    </div>
  )
}

export default ChatSendMessage
