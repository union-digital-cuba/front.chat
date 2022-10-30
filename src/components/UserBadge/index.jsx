import React from 'react'

import { CustomBadge } from 'components'
import { Avatar, Text } from '@nextui-org/react'
import { GetImage } from 'helpers/images'

import './style.css'

const CustomUserBadge = ({ user, color, pendingMessages, status, showDetails, size }) => {
  const { sizeAvatar, sizeNotification, sizeStatus } = size
  const CustomUser = (
    <div className="custom-user-container">
      <CustomBadge
        pendingMessages={pendingMessages}
        status={status}
        sizeNotification={sizeNotification}
        sizeStatus={sizeStatus}
      >
        <Avatar src={GetImage(user.image)} color={color} bordered size={sizeAvatar} />
      </CustomBadge>
      {showDetails && (
        <div className="custom-user-container-detail">
          <Text>{user.username}</Text>
          <Text size="$xs">{user.email}</Text>
        </div>
      )}
    </div>
  )

  return CustomUser
}

export default CustomUserBadge
