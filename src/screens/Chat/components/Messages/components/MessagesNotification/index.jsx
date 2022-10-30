import React from 'react'
import * as IconlyPack from 'react-iconly'

import { CustomTypes } from 'common'
import { CustomUserBadge } from 'components'
import { GetRandomElementFromList, GetRandomNumber } from 'helpers/random'

import './style.css'
import { Badge } from '@nextui-org/react'

const ChatMessagesNotification = ({ users }) => {
  //Son los usuarios activos en el Grupo, que tengan menos de 5 min
  //Desde la ultima actividad
  //SOCKET
  const arrayOfColors = Object.keys(CustomTypes.ColorsButton)

  return (
    <div className="messages-notification">
      <div className="active-users">
        {users.data.map((user, index) => {
          const color = GetRandomElementFromList(arrayOfColors)
          const number = GetRandomNumber(10)

          const size = {
            sizeAvatar: CustomTypes.Sizes.sm,
            sizeNotification: CustomTypes.Sizes.sm,
            sizeStatus: CustomTypes.Sizes.sm,
          }

          return (
            <CustomUserBadge
              key={index}
              user={user}
              color={color}
              pendingMessages={number}
              status={user.id % 2 === 0 ? CustomTypes.BadgeVariants.dot : CustomTypes.BadgeVariants.points}
              showDetails={false}
              size={size}
            />
          )
        })}
      </div>
      <div className="options">
        <Badge color="error" content="9+" shape="circle" size={CustomTypes.Sizes.sm} isInvisible="false">
          <IconlyPack.Notification className="menu-icons" set="bold" />
        </Badge>
        <IconlyPack.MoreCircle className="menu-icons" set="bold" />
      </div>
    </div>
  )
}

export default ChatMessagesNotification
