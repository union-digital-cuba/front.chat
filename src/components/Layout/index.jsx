import React from 'react'
import CustomContainer from 'components/Container'

import { NextUIProvider, createTheme } from '@nextui-org/react'
import useDarkMode from 'use-dark-mode'
import CustomNavBar from './NavBar'

import './style.css'

const CustomLayout = ({ children }) => {
  const darkMode = useDarkMode(false)

  const lightTheme = createTheme({
    type: 'light',
  })

  const darkTheme = createTheme({
    type: 'dark',
  })

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <div className="custom-layout">
        <CustomNavBar />
        <CustomContainer>{children}</CustomContainer>
      </div>
    </NextUIProvider>
  )
}

export default CustomLayout
