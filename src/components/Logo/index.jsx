import React from 'react'

import './style.css'

const CustomLogo = ({ text, logoSource }) => {
  return (
    <div className="brand">
      <img src={logoSource} alt="Logo" />
      <h1>{text}</h1>
    </div>
  )
}

export default CustomLogo
