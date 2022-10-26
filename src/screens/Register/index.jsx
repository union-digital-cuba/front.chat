import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '@nextui-org/react'

import { CustomForm, CustomInput, CustomLayout, CustomPopUp, CustomSpan } from 'components'
import { HelperFunction } from 'helpers/functions'

import { CustomTypes } from 'common/CustomTypes'
import { AuthenticationAPI } from 'api/Autentication'

const Register = () => {
  const history = useHistory()

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
    if (!HelperFunction.EmailValidate(email)) {
      CustomPopUp(Icons.error, 'Required Correct Email')
      valid = false
    }
    if (password !== confirmPassword) {
      CustomPopUp(Icons.error, 'Password and Confirmation do not match')
      valid = false
    }

    return valid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const valid = handleValidate()

    try {
      if (valid) {
        const { username, email, password } = values
        const { statusCode, message } = await AuthenticationAPI.Register({ username, email, password })

        if (statusCode === 200) {
          CustomPopUp(CustomTypes.PopUp.Icon.success, 'Register Complete')

          history.push('/login')
        } else CustomPopUp(CustomTypes.PopUp.Icon.error, message)
      }
    } catch (error) {
      CustomPopUp(CustomTypes.PopUp.Icon.error, error)
    }
  }

  const handleChange = (event) => {
    HelperFunction.handleChange(event, values, setValues)
  }

  const makeSubmitButton = <Button type={'submit'}>Create User</Button>
  const makeLoginButton = (
    <Button color="secondary" onClick={() => history.push('/login')} auto>
      Login
    </Button>
  )
  const makeFooter = <CustomSpan text={'Already have a account ?'} actionComponent={makeLoginButton} />

  const registerScreen = (
    <CustomForm
      handleOnSubmit={handleSubmit}
      caption={'Register your data...'}
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
  )

  return <CustomLayout>{registerScreen}</CustomLayout>
}

export default Register
