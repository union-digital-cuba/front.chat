import React from 'react'
import './style.css'

import { Text } from '@nextui-org/react'

const CustomSpan = ({ text, actionComponent }) => {
  return (
    <div className="div-span">
      <Text className="span-badge" h5 variant="bordered">
        {`${text}`}
      </Text>
      {actionComponent}
    </div>
  )
}

export default CustomSpan
