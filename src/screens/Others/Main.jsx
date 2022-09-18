import React, { useEffect, useState } from 'react'
import { Header } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import io from 'socket.io-client'

import Dashboard from '../../components/Others/Dashboard'
import Login from '../../components/Login'

import '../styles/App.css'

import { saveItemLocalStorage, getItemLocalStorage, removeItemLocalStorage } from '../../services/service'

const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}

const socket = io.connect('http://localhost:4000')
const WAIT_INTERVAL = 1000

const MainScreen = () => {
  const [timer, setTimer] = useState(null)

  const [globalState, setGlobalState] = useState({
    userName: '',
    isLoggedIn: false,
    messages: [],
    message: '',
    userTyping: {
      isTyping: false,
      user: '',
      message: '',
    },
  })

  useEffect(() => {
    let data = getItemLocalStorage('reactSocketApp')
    if (data) {
      setGlobalState({ userName: data.userName, isLoggedIn: data.isLoggedIn })
    }

    // Subscribe to WebSocket events
    listenForMessages()
    listenForTyping()
    listenForStopTyping()
  }, [])

  const listenForMessages = () => {
    socket.on('received', (message) => {
      const messages = globalState.messages
      setGlobalState({ messages: [...messages, message] })
    })
  }

  const listenForTyping = () => {
    socket.on('notifyTyping', (data) => {
      const userTyping = {
        isTyping: true,
        user: data.user,
        message: data.message,
      }

      // Avoid notifing same logged in user
      if (globalState.userName !== userTyping.user) {
        setGlobalState({ userTyping })
      }
    })
  }

  const listenForStopTyping = () => {
    socket.on('notifyStopTyping', () => {
      console.log('user stop typing')

      const userTyping = {
        isTyping: false,
        user: '',
        message: '',
      }

      setGlobalState({ userTyping })
    })
  }

  const handleInputValueChange = (event) => {
    setGlobalState({ [event.target.name]: event.target.value })

    clearTimeout(timer)
    setTimer(setTimeout(sendStopTyping, WAIT_INTERVAL))
  }

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      sendMessage()
      sendStopTyping()
    } else {
      sendStartTyping()
    }
  }

  const login = (event) => {
    event.preventDefault()
    setGlobalState({ isLoggedIn: true })
    saveItemLocalStorage(globalState.userName)
  }

  const logOut = () => {
    setGlobalState({ isLoggedIn: false, userName: '' })
    removeItemLocalStorage('reactSocketApp')
    sendDisconnect()
  }

  const sendMessage = () => {
    socket.emit('chat message', null, null, globalState.message)
    setGlobalState({ message: '' })
  }

  const sendStartTyping = () => {
    const data = { user: globalState.userName, message: globalState.message }
    socket.emit('typing', data)
  }

  const sendStopTyping = () => {
    socket.emit('stopTyping')
  }

  const sendDisconnect = () => {
    socket.emit('disconnect')
  }

  return (
    <Router>
      <Header as="h1" content="Cliente Chat (React)" textAlign="center" style={style.h1} />
      <Switch>
        <Route
          render={() =>
            globalState.isLoggedIn ? (
              <Dashboard
                userName={globalState.userName}
                style={style}
                message={globalState.message}
                messages={globalState.messages}
                userTyping={globalState.userTyping}
                logOut={logOut}
                handleInputValueChange={handleInputValueChange}
                handleKeyPressed={handleKeyPressed}
                sendMessage={sendMessage}
              />
            ) : (
              <Login userName={globalState.userName} login={login} handleInputValueChange={handleInputValueChange} />
            )
          }
        />
      </Switch>
    </Router>
  )
}

export default MainScreen
