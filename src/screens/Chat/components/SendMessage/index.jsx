import React from 'react'

import { Input } from '@nextui-org/react'
import SendButton from './components'

import './style.css'
import { SendIcon } from 'components/Icons'

const ChatSendMessage = () => {
  return (
    <div className="send-message-container">
      <Input
        css={{ w: '100%' }}
        clearable
        contentRightStyling={false}
        placeholder="Type your message..."
        contentRight={
          <SendButton>
            <SendIcon />
          </SendButton>
        }
      />
    </div>
  )
}

export default ChatSendMessage
