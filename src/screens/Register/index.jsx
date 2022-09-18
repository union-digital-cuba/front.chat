import React from 'react'

import { CustomContainer, CustomButton, CustomForm, CustomInput, CustomLogo, CustomSpan } from 'components'

import Logo from 'assets/images/logo.svg'

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert('form')
  }

  const handleChange = (event) => {
    alert(event)
  }

  const makeLogoComponent = <CustomLogo text={'Shy, Shy'} logoSource={Logo} />
  const makeSubmitButton = <CustomButton type={'submit'} text={'Create User'} />
  const makeFooter = <CustomSpan text={'Already have a account ?'} redirectTo={'/login'} redirectText={'Login'} />

  return (
    <>
      <CustomContainer>
        <CustomForm handleOnSubmit={handleSubmit} logoComponent={makeLogoComponent} submitButton={makeSubmitButton} footer={makeFooter}>
          <CustomInput type="text" placeholder="Username" name="username" handleChange={handleChange} />
          <CustomInput type="email" placeholder="Email" name="email" handleChange={handleChange} />
          <CustomInput type="password" placeholder="Password" name="password" handleChange={handleChange} />
          <CustomInput type="password" placeholder="Confirm Password" name="confirmPassword" handleChange={handleChange} />
        </CustomForm>
      </CustomContainer>
    </>
  )
}

export default Register
