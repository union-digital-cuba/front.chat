import React from 'react'
import AppRouter from 'routers/AppRouter'

import { ViewportProvider } from 'context/ViewportProvider'
import UserProvider from 'context/UserProvider'

// const server = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`

const App = () => {
  return (
    <UserProvider>
      <ViewportProvider>
        <AppRouter />
      </ViewportProvider>
    </UserProvider>
  )
}

export default App
