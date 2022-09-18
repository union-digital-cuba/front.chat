import React, { useState } from 'react'
import Logo from 'assets/images/logo.svg'

import { CustomContainer, CustomButton, CustomForm, CustomInput, CustomLogo, CustomSpan, CustomPopUp } from 'components'
import { HelperFunction } from 'helpers/functions'

import { CustomTypes } from 'common/CustomTypes'

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleValidate = () => {
    const { username, email, password, confirmPassword } = values

    const Icons = CustomTypes.PopUp.Icon
    var valid = true

    if (!username) {
      CustomPopUp(Icons.error, 'Required Username')
      valid = false
    }
    if (HelperFunction.EmailValidate(email)) {
      CustomPopUp(Icons.error, 'Required Correct Email')
      valid = false
    }
    if (password !== confirmPassword) {
      CustomPopUp(Icons.error, 'Password and Confirmation do not match')
      valid = false
    }

    return valid
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const valid = handleValidate()
    if (valid) {
      // const { username, email, password, confirmPassword } = values
    }
  }

  const handleChange = (event) => {
    HelperFunction.handleChange(event, values, setValues)
  }

  const makeLogoComponent = <CustomLogo text={'Shy, Shy'} logoSource={Logo} />
  const makeSubmitButton = <CustomButton type={'submit'} text={'Create User'} />
  const makeFooter = <CustomSpan text={'Already have a account ?'} redirectTo={'/login'} redirectText={'Login'} />

  return (
    <>
      <CustomContainer>
        <CustomForm
          handleOnSubmit={handleSubmit}
          logoComponent={makeLogoComponent}
          submitButton={makeSubmitButton}
          footer={makeFooter}
        >
          <CustomInput type="text" placeholder="Username" name="username" required={true} handleChange={handleChange} />
          <CustomInput type="email" placeholder="Email" name="email" required={true} handleChange={handleChange} />
          <CustomInput type="password" placeholder="Password" name="password" required={true} handleChange={handleChange} />
          <CustomInput
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required={true}
            handleChange={handleChange}
          />
        </CustomForm>
      </CustomContainer>
    </>
  )
}

export default Register
