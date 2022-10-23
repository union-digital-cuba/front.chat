import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { LocalStorage } from 'common'
const Chat = () => {
  const history = useHistory()

  useEffect(() => {
    const CheckLocalStorage = async () => {
      const storage = await JSON.parse(LocalStorage.Get())
      if (!storage) history.push('/login')

      if (!storage.isSetAvatar) history.push('/avatar')
    }
    CheckLocalStorage()
  }, [])

  return (
    <div>
      <h1>CHAT</h1>
    </div>
  )
}

export default Chat
