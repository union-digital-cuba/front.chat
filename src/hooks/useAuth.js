import React, { useContext } from 'react'
import { createContext, useState } from 'react'
import * as storage from 'common/storage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const logIn = (userName, id) => {
    const data = { userName, id }

    setUser(data)
    storage.setUser({ userName, id })
  }

  const logOut = () => {
    const data = {
      userName: '',
      id: null,
    }
    storage.setUser(data)
    setUser(null)
  }

  const isLogIn = () => {
    return user ? true : false
  }

  const getUserName = () => {
    return user ? user.userName : ''
  }

  const getUser = () => {
    return user
  }

  const contextValue = {
    user,
    logIn,
    logOut,
    isLogIn,
    getUserName,
    getUser,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
