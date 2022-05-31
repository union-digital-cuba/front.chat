import React from 'react'
import AppRouter from 'routers/AppRouter'
import './styles/App.css'

const server = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`

const App = () => {
  return <AppRouter serverAddress={server} />
}

export default App
