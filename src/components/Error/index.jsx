import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Button } from '@nextui-org/react'

const CustomErrorInScreen = ({ error }) => {
  const history = useHistory()
  const location = useLocation()

  return (
    <div className="error">
      <h1>{error}</h1>
      <Button onClick={() => history.replace({ pathname: location.pathname })} />
    </div>
  )
}

export default CustomErrorInScreen
