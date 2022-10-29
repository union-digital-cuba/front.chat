import { Badge } from '@nextui-org/react'
import React from 'react'

const CustomBadge = ({ children }) => {
  return (
    <Badge content="" isSquared color="primary" placement="bottom-right" variant="points" size="md">
      <Badge color="error" content={5} shape="rectangle">
        {children}
      </Badge>
    </Badge>
  )
}

export default CustomBadge
