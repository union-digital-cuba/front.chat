import React from 'react'
import useAuth from 'hooks/useAuth'

import { Avatar } from '@nextui-org/react'
import { GetImage } from 'helpers/images'
import { CustomTypes } from 'common'

import './style.css'

const ChatMessage = ({ chat }) => {
  const loggedUser = useAuth().GetUser()

  const MessageAvatar = (loadMyAvatar) => {
    const image = loadMyAvatar ? chat.sender.image : chat.receiver.image
    const color = loadMyAvatar ? CustomTypes.ColorsButton.primary : CustomTypes.ColorsButton.secondary

    return <Avatar src={GetImage(image)} color={color} bordered size={CustomTypes.Sizes.sm} />
  }

  const MessageDetail = () => {
    return <div className="message-detail">{chat.message}</div>
  }

  const MessageByOther = () => {
    return (
      <div className="message-container-receiver" key={chat.id}>
        <div className="message-avatar">{MessageAvatar(false)}</div>
        <div className="message-content message-by-other">{MessageDetail()}</div>
      </div>
    )
  }

  const MessageByMe = () => {
    return (
      <div className="message-container-sender" key={chat.id}>
        <div className="message-content message-by-me">{MessageDetail()}</div>
        <div className="message-avatar">{MessageAvatar(true)}</div>
      </div>
    )
  }

  return <>{loggedUser.id === chat.sender.id ? MessageByMe() : MessageByOther()}</>
}

export default ChatMessage
