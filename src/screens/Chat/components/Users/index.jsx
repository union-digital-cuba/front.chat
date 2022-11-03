import React from 'react'

import { Loading } from '@nextui-org/react'
import { GetRandomElementFromList, GetRandomNumber } from 'helpers/random'
import { CustomTypes } from 'common'
import { CustomUserBadge } from 'components'

import './style.css'

const ChatUsers = ({ users, handleSelectUser }) => {
  const arrayOfColors = Object.keys(CustomTypes.ColorsButton)

  const GetLoading = <Loading color="error">Loading...</Loading>

  const GetChatUsersContainer = () => {
    return users.data.map((user, index) => {
      const color = GetRandomElementFromList(arrayOfColors)
      const number = GetRandomNumber(10)

      const size = {
        sizeAvatar: CustomTypes.Sizes.lg,
        sizeNotification: CustomTypes.Sizes.md,
        sizeStatus: CustomTypes.Sizes.md,
      }

      return (
        <CustomUserBadge
          key={index}
          user={user}
          color={color}
          pendingMessages={number}
          status={user.id % 2 === 0 ? CustomTypes.BadgeVariants.dot : CustomTypes.BadgeVariants.points}
          showDetails={true}
          size={size}
          onClick={() => handleSelectUser({ type: CustomTypes.ChatType.user, data: user })}
        />
      )
    })
  }

  return <div className="chat-users-container">{users.loading ? GetLoading : GetChatUsersContainer()}</div>
}

export default ChatUsers
