import React from 'react'

import { Loading } from '@nextui-org/react'
import { GetRandomElementFromList, GetRandomNumber } from 'helpers/random'
import { CustomTypes } from 'common'

import './style.css'
import { CustomUserBadge } from 'components'

const ChatUsers = ({ users }) => {
  const arrayOfColors = Object.keys(CustomTypes.ColorsButton)

  return (
    <div className="chat-users-container">
      {users.loading ? (
        <Loading color="error">Loading...</Loading>
      ) : (
        users.data.map((user, index) => {
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
            />
          )
        })
      )}
    </div>
  )
}

export default ChatUsers
