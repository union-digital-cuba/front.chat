import { Badge } from '@nextui-org/react'
import { CustomTypes } from 'common'
import React from 'react'

const CustomBadge = ({ pendingMessages, status, sizeNotification, sizeStatus, children }) => {
  const color =
    status === CustomTypes.BadgeVariants.dot ? CustomTypes.ColorsButton.success : CustomTypes.ColorsButton.primary

  return (
    <Badge content="" isSquared color={color} placement="bottom-right" variant={status} size={sizeStatus}>
      <Badge color="error" content={pendingMessages} shape="rectangle" size={sizeNotification}>
        {children}
      </Badge>
    </Badge>
  )
}

export default CustomBadge
