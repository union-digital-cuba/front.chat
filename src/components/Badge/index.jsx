import { Badge } from '@nextui-org/react'
import { CustomTypes } from 'common'
import React from 'react'

const CustomBadge = ({ pendingMessages, status, children }) => {
  const color =
    status === CustomTypes.BadgeVariants.dot ? CustomTypes.ColorsButton.success : CustomTypes.ColorsButton.primary

  return (
    <Badge content="" isSquared color={color} placement="bottom-right" variant={status} size="md">
      <Badge color="error" content={pendingMessages} shape="rectangle">
        {children}
      </Badge>
    </Badge>
  )
}

export default CustomBadge
