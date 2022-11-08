import React from 'react'
import useAuth from 'hooks/useAuth'

import { Avatar } from '@nextui-org/react'
import { GetImage } from 'helpers/images'
import { CustomTypes } from 'common'

import { format } from 'timeago.js'
import * as IconlyPack from 'react-iconly'

import './style.css'

const ChatMessage = ({ chat, selected }) => {
  const loggedUser = useAuth().GetUser()

  const MessageAvatar = (loadMyAvatar) => {
    const avatar = selected.type === CustomTypes.ChatType.user ? selected.data.image : chat.sender.image
    const image = loadMyAvatar ? loggedUser.image : avatar
    const color = loadMyAvatar ? CustomTypes.ColorsButton.primary : CustomTypes.ColorsButton.secondary

    return <Avatar src={GetImage(image)} color={color} bordered size={CustomTypes.Sizes.sm} />
  }

  const MessageDetail = () => {
    const MessageTypeIcon = {
      time: <IconlyPack.TimeSquare set="bold" primaryColor="blueviolet" size={8} />,
      delivered: <IconlyPack.TickSquare set="bold" primaryColor="blueviolet" size={8} />,
      sended: <IconlyPack.TickSquare set="two-tone" size={8} />,
    }

    return (
      <div className="message-detail">
        <div className="message-detail-msg">{chat.message}</div>
        <div className="message-details">
          <p>{format(chat.date)}</p>
          <span>{MessageTypeIcon.sended}</span>
        </div>
      </div>
    )
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
