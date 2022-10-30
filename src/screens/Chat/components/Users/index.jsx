import React from 'react'

import { Loading } from '@nextui-org/react'
import { GetRandomElementFromList } from 'helpers/random'
import { CustomTypes } from 'common'

import './style.css'
import CustomUserBadge from './CustomUserBadge'

const ChatUsers = ({ users }) => {
  return (
    <div className="chat-users-container">
      {users.loading ? (
        <Loading color="error">Loading...</Loading>
      ) : (
        users.data.map((user, index) => {
          const arrayOfColors = Object.keys(CustomTypes.ColorsButton)
          const color = GetRandomElementFromList(arrayOfColors)
          return (
            <CustomUserBadge
              key={index}
              user={user}
              color={color}
              pendingMessages={5}
              status={user.id % 2 === 0 ? CustomTypes.BadgeVariants.dot : CustomTypes.BadgeVariants.points}
            />
          )
        })
      )}
    </div>
  )
}

export default ChatUsers
