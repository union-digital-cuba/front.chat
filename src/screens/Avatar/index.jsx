import React, { useEffect } from 'react'

import { GetRandomAvatarNumbers } from 'helpers/random'
import { AuthenticationAPI } from 'api/Autentication'

const Avatar = () => {
  useEffect(() => {
    const SetAvatar = () => {
      const avatar = GetRandomAvatarNumbers(8)
      AuthenticationAPI.SetAvatar(avatar)
    }
    SetAvatar()
  }, [])

  return <div></div>
}

export default Avatar
