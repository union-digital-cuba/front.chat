import React from 'react'

import { CustomBadge } from 'components'
import './style.css'
import { Avatar, Text } from '@nextui-org/react'
import { GetImage } from 'helpers/images'

const CustomUserBadge = ({ user, color, pendingMessages, status }) => {
  const CustomUser = (
    <div className="custom-user-container">
      <CustomBadge pendingMessages={pendingMessages} status={status}>
        <Avatar size="lg" src={GetImage(user.image)} color={color} bordered />
      </CustomBadge>

      <div className="custom-user-container-detail">
        <Text>{user.username}</Text>
        <Text size="$xs">{user.email}</Text>
      </div>
    </div>
  )

  return CustomUser
}

export default CustomUserBadge
