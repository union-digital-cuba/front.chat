import React from 'react'
import { CustomButton } from 'components'
import { useHistory, useLocation } from 'react-router-dom'

const CustomErrorInScreen = ({ error }) => {
  const history = useHistory()
  const location = useLocation()

  return (
    <div className="error">
      <h1>{error}</h1>
      <CustomButton type="button" handleOnClick={() => history.replace({ pathname: location.pathname })} />
    </div>
  )
}

export default CustomErrorInScreen
