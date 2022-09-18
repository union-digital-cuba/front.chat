import React, { useState } from 'react'
import Logo from 'assets/images/logo.svg'

import { CustomContainer, CustomButton, CustomForm, CustomInput, CustomLogo, CustomSpan } from 'components'
import { HelperFunction } from 'helpers/functions'

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('form')
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
