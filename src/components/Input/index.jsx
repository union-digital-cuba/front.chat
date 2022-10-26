import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Input } from '@nextui-org/react'

const CustomInput = ({
  type,
  label,
  placeholder,
  helperText,
  name,
  required,
  disabled,
  readOnly,
  clearable,
  rounded,
  bordered,
  handleChange,
}) => {
  const [inputData, setInputData] = useState({ color: '' })

  const onValueChange = (e) => {
    const filled = !!e.target.value
    const error = required ? (filled === true ? false : true) : false
    setInputData({ color: error ? 'error' : '' })
    handleChange(e)
  }

  const InputPassword = (
    <Input.Password
      color={inputData.color}
      type={type}
      label={label}
      labelPlaceholder={placeholder}
      helperText={helperText}
      disabled={disabled}
      rounded={rounded}
      readOnly={readOnly}
      clearable={clearable}
      bordered={bordered}
      name={name}
      onChange={(e) => onValueChange(e)}
    />
  )
  const InputDefault = (
    <Input
      color={inputData.color}
      type={type}
      label={label}
      labelPlaceholder={placeholder}
      helperText={helperText}
      disabled={disabled}
      rounded={rounded}
      readOnly={readOnly}
      clearable={clearable}
      bordered={bordered}
      name={name}
      onChange={(e) => onValueChange(e)}
    />
  )

  const GetInput = () => {
    return type === 'password' ? InputPassword : InputDefault
  }

  return GetInput()
}

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  clearable: PropTypes.bool,
  bordered: PropTypes.bool,
  rounded: PropTypes.bool,
}

CustomInput.defaultProps = {
  type: 'text',
  placeholder: '',
  labelPlaceholder: '',
  label: '',
  name: 'textUndefined',
  helperText: '',
  required: false,
  disabled: false,
  readOnly: false,
  clearable: false,
  bordered: true,
  rounded: false,
}

export default CustomInput
