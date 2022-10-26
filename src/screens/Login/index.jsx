import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Logo from 'assets/images/logo.svg'

import { Button } from '@nextui-org/react'

import { CustomForm, CustomInput, CustomLogo, CustomPopUp, CustomLayout, CustomSpan } from 'components'
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
    if (storage) {
      const { isSetAvatar, image } = storage
      history.push(isSetAvatar && image ? '/' : '/avatar')
    }
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
  const makeSubmitButton = (
    <Button type={'submit'} color="primary">
      Login
    </Button>
  )
  const makeRegisterButton = (
    <Button color="secondary" onClick={() => history.push('/register')} auto>
      Register
    </Button>
  )
  const makeFooter = <CustomSpan text={'Create user here...'} actionComponent={makeRegisterButton} />

  const loginScreen = (
    <CustomForm
      handleOnSubmit={handleSubmit}
      logoComponent={makeLogoComponent}
      submitButton={makeSubmitButton}
      footer={makeFooter}
    >
      <CustomInput type="text" placeholder="Username" name="username" required={true} handleChange={handleChange} />
      <CustomInput type="password" placeholder="Password" name="password" required={true} handleChange={handleChange} />
    </CustomForm>
  )
  return <CustomLayout>{loginScreen}</CustomLayout>
}

export default Login
