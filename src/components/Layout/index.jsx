import React from 'react'
import CustomContainer from 'components/Container'

import { NextUIProvider } from '@nextui-org/react'

const CustomLayout = ({ children }) => {
  return (
    <NextUIProvider>
      <CustomContainer>
        <CustomLayout />
        {children}
      </CustomContainer>
    </NextUIProvider>
  )
}

export default CustomLayout
