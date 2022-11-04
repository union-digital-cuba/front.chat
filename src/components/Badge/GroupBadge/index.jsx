import React from 'react'

import { CustomBadge } from 'components'
import { Avatar, Text } from '@nextui-org/react'
import { GetImage } from 'helpers/images'

import './style.css'

const CustomGroupBadge = ({ group, color, pendingMessages, status, showDetails, size, clickeable, handleOnClick }) => {
  const { sizeAvatar, sizeNotification, sizeStatus } = size
  const CustomUser = (
    <div className={`custom-user-container ${clickeable && 'clickeable'}`} onClick={() => handleOnClick()}>
      <CustomBadge
        pendingMessages={pendingMessages}
        status={status}
        sizeNotification={sizeNotification}
        sizeStatus={sizeStatus}
      >
        <Avatar src={GetImage(group.image)} color={color} bordered size={sizeAvatar} css={{ cursor: 'pointer' }} />
      </CustomBadge>
      {showDetails && (
        <div className="custom-user-container-detail">
          <Text>{group.name}</Text>
          <Text size="$xs">{'Last Message...'}</Text>
        </div>
      )}
    </div>
  )

  return CustomUser
}

export default CustomGroupBadge
