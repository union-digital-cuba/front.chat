import React, { useState, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const LogIn = (user) => {
    setUser(user)
  }

  const LogOut = () => {
    setUser(null)
  }

  const ChangeAvatar = (avatar) => {
    setUser({ ...user, image: avatar, isSetAvatar: true })
  }

  const GetUserData = () => user

  const contextValue = {
    LogIn,
    LogOut,
    ChangeAvatar,
    GetUserData,
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserProvider
