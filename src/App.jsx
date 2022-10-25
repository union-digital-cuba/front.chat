import React from 'react'
import AppRouter from 'routers/AppRouter'

import { ViewportProvider } from 'context/ViewportProvider'
// const server = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`

const App = () => {
  return (
    <ViewportProvider>
      <AppRouter />
    </ViewportProvider>
  )
}

export default App
