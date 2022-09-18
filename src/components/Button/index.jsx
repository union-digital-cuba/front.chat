import React from 'react'

import './style.css'

const CustomButton = ({ type, text, handleOnClick }) => {
  return (
    <button type={type} onClick={() => handleOnClick()}>
      {text}
    </button>
  )
}

export default CustomButton
