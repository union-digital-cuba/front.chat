import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '@nextui-org/react'

import { CustomForm, CustomInput, CustomPopUp, CustomLayout, CustomSpan } from 'components'
import { LocalStorage, CustomTypes } from 'common'
import { HelperFunction } from 'helpers/functions'

import { AuthenticationAPI } from 'api/Autentication'
import useAuth from 'hooks/useAuth'

const Login = () => {
  const history = useHistory()

  const auth = useAuth()

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    const user = auth.GetUser()
    if (user) {
      const { isSetAvatar, image } = user
      auth.SetUser(user)
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
          auth.SetUser(response)

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
      caption={'Start Chating...'}
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
