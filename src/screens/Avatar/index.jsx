import React, { useState, useEffect } from 'react'

import { MultiAvatarAPI } from 'api/Avatar'
import { CustomContainer, CustomErrorInScreen, CustomButton } from 'components'
import { GetTakeFirstNElements } from 'helpers/avatars'
import { GetSrcDependingOfType } from 'helpers/images'
import { CustomTypes } from 'common/CustomTypes'
import LoaderGif from 'assets/gifs/loader.gif'

import './style.css'

const Avatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState()
  const [avatars, setAvatars] = useState({ loading: true, error: undefined, data: [] })

  const ammountAvatarsToLoad = 4

  useEffect(() => {
    const LoadAvatars = async () => {
      try {
        const multiavatars = await MultiAvatarAPI.GetRandomAvatar(ammountAvatarsToLoad)
        setAvatars({ loading: false, error: false, data: [...multiavatars], web: true })
      } catch (error) {
        var assetsAvatars = GetTakeFirstNElements(ammountAvatarsToLoad)
        setAvatars({ loading: false, error: false, data: [...assetsAvatars], web: false })
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
        var imageType = avatars.web ? CustomTypes.ImageTypes.Base64 : CustomTypes.ImageTypes.Assets

        return (
          <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
            <img
              src={GetSrcDependingOfType(imageType, avatar)}
              alt="avatar"
              onClick={() => handleOnClickSelectAvatar(index)}
            />
          </div>
        )
      })
    )
  }

  const Loader = (
    <CustomContainer>
      <img src={LoaderGif} alt="" />
    </CustomContainer>
  )

  const AvatarPick = (
    <>
      <div className="title-container">
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className="avatars">{avatars.loading ? <h1>Loading...</h1> : RenderAvatarsOrError()}</div>
      {!avatars.loading && <CustomButton type={'submit'} text={'Set as Profile Avatar'} />}
    </>
  )

  return <CustomContainer>{avatars.loading ? Loader : AvatarPick}</CustomContainer>
}

export default Avatar
