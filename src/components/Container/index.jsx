import React from 'react'
import useDarkMode from 'use-dark-mode'

import './style.css'

const CustomContainer = ({ children }) => {
  const darkMode = useDarkMode()
  const containerClassName = `custom-container theme-${darkMode.value ? 'dark' : 'light'}`

  return <div className={containerClassName}>{children}</div>
}

export default CustomContainer
