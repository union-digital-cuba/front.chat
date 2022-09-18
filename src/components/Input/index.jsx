import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.css'

const CustomInput = ({ type, placeholder, name, required, handleChange }) => {
  const [className, setClassName] = useState('custom')

  const onValueChange = (e) => {
    const filled = !!e.target.value
    const error = required ? (filled === true ? false : true) : false
    console.log(filled, error)
    setClassName(error ? 'required' : 'success')
    handleChange(e)
  }

  return <input className={className} type={type} placeholder={placeholder} name={name} onChange={(e) => onValueChange(e)} />
}

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  handleChange: PropTypes.func,
}

CustomInput.defaultProps = {
  type: 'text',
  placeholder: 'Texto Sin Definir',
  name: 'textUndefined',
  required: false,
}

export default CustomInput
