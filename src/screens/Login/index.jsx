import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from 'assets/images/logo.svg'

import { CustomContainer, CustomButton, CustomForm, CustomInput, CustomLogo, CustomSpan, CustomPopUp } from 'components'
import { LocalStorage } from 'common'
import { HelperFunction } from 'helpers/functions'

import { CustomTypes } from 'common/CustomTypes'
import { AuthenticationAPI } from 'api/Autentication'

const Login = () => {
  const history = useHistory()

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    const storage = JSON.parse(LocalStorage.Get())
    if (storage) history.push('/')
  }, [])

  const handleValidate = () => {
    const { username, password } = values

    const Icons = CustomTypes.PopUp.Icon
    var valid = true

    if (!username) {
      CustomPopUp(Icons.error, 'Required Username')
      valid = false
    }
    if (!password) {
      CustomPopUp(Icons.error, 'Required Password')
      valid = false
    }

    return valid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const valid = handleValidate()

    if (valid) {
      try {
        const { username, password } = values
        const { statusCode, response, message } = await AuthenticationAPI.Login({ username, password })

        if (statusCode === 200) {
          CustomPopUp(CustomTypes.PopUp.Icon.success, 'Login Complete')
          LocalStorage.Set(JSON.stringify(response))

          response.isSetAvatar ? history.push('/') : history.push('/avatar')
        } else CustomPopUp(CustomTypes.PopUp.Icon.error, message)
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, error)
      }
    }
  }

  const handleChange = (event) => {
    HelperFunction.handleChange(event, values, setValues)
  }

  const makeLogoComponent = <CustomLogo text={'Login...'} logoSource={Logo} />
  const makeSubmitButton = <CustomButton type={'submit'} text={'Login'} />
  const makeFooter = <CustomSpan text={'Already have a account?'} redirectTo={'/register'} redirectText={'Register'} />

  return (
    <CustomContainer>
      <CustomForm
        handleOnSubmit={handleSubmit}
        logoComponent={makeLogoComponent}
        submitButton={makeSubmitButton}
        footer={makeFooter}
      >
        <CustomInput type="text" placeholder="Username" name="username" required={true} handleChange={handleChange} />
        <CustomInput
          type="password"
          placeholder="Password"
          name="password"
          required={true}
          handleChange={handleChange}
        />
      </CustomForm>
    </CustomContainer>
  )
}

export default Login
