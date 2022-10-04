import React, { useState, useEffect } from 'react'

import { MultiAvatarAPI } from 'api/Avatar'
import { CustomContainer, CustomErrorInScreen } from 'components'

import './style.css'

const Avatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState()
  const [avatars, setAvatars] = useState({ loading: true, error: undefined, data: [] })

  useEffect(() => {
    const LoadAvatars = async () => {
      try {
        const multiavatars = await MultiAvatarAPI.GetRandomAvatar(6)
        setAvatars({ loading: false, error: false, data: [...multiavatars] })
      } catch (error) {
        setAvatars({ loading: false, error: error, data: [] })
      }
    }
    LoadAvatars()
  }, [])

  const handleOnClickSelectAvatar = (index) => {
    setSelectedAvatar(index)
  }

  const RenderAvatarsOrError = () => {
    return avatars.error ? (
      <CustomErrorInScreen error={avatars.error} />
    ) : (
      avatars.data.map((avatar, index) => {
        return (
          <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => handleOnClickSelectAvatar(index)} />
          </div>
        )
      })
    )
  }

  return (
    <CustomContainer>
      <div className="title-container">
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className="avatars">{avatars.loading ? <h1>Loading...</h1> : RenderAvatarsOrError()}</div>
    </CustomContainer>
  )
}

export default Avatar
