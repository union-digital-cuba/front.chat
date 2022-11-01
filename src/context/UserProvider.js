import { LocalStorage } from 'common'
import React, { useState, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(LocalStorage.Get()))

  const SetUser = (user) => {
    LocalStorage.Set(JSON.stringify(user))
    setUser(user)
  }

  const ClearUser = () => {
    LocalStorage.Remove()
    setUser(null)
  }

  const ChangeAvatar = (avatar) => {
    setUser({ ...user, image: avatar, isSetAvatar: true })
  }

  const GetAvatar = () => user?.image

  const GetUser = () => user

  const contextValue = {
    SetUser,
    ClearUser,
    ChangeAvatar,
    GetAvatar,
    GetUser,
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserProvider
