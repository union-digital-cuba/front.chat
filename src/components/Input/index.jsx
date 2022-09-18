import React from 'react'

import './style.css'

const CustomInput = ({ type, placeholder, name, handleChange }) => {
  return <input type={type} placeholder={placeholder} name={name} onChange={(e) => handleChange(e)} />
}

export default CustomInput
