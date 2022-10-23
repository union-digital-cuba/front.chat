import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { MultiAvatarAPI, AvatarAPI } from 'api/Avatar'
import { CustomContainer, CustomErrorInScreen, CustomButton, CustomLoader, CustomPopUp } from 'components'
import { GetTakeFirstNElements } from 'helpers/avatars'
import { GetSrcDependingOfType } from 'helpers/images'
import { CustomTypes } from 'common/CustomTypes'

import './style.css'
import { LocalStorage } from 'common'

const Avatar = () => {
  const history = useHistory()

  const [selectedAvatar, setSelectedAvatar] = useState()
  const [avatars, setAvatars] = useState({ loading: true, error: undefined, data: [] })

  useEffect(() => {
    const storage = JSON.parse(LocalStorage.Get())
    if (!storage) history.push('/login')
  }, [])

  useEffect(() => {
    const LoadAvatars = async () => {
      const ammountAvatarsToLoad = 4

      try {
        const multiavatars = await MultiAvatarAPI.GetRandomAvatar({ amount: ammountAvatarsToLoad })
        setAvatars({ loading: false, error: false, data: [...multiavatars], web: true })
      } catch (multiError) {
        try {
          var assetsAvatars = GetTakeFirstNElements({ amount: ammountAvatarsToLoad })
          setAvatars({ loading: false, error: false, data: [...assetsAvatars], web: false })
        } catch (localError) {
          CustomPopUp(CustomTypes.PopUp.Icon.error, `Error loading avatars... ${localError}`)
        }
      }
    }
    LoadAvatars()
  }, [])

  const handleOnClickAvatar = (index) => {
    setSelectedAvatar(index)
  }

  const handleOnClickSelectAvatar = async () => {
    if (!selectedAvatar) CustomPopUp(CustomTypes.PopUp.Icon.error, 'Please, select a avatar...')
    else {
      try {
        const storage = await JSON.parse(LocalStorage.Get())
        const avatar = avatars[selectedAvatar]
        const response = await AvatarAPI.SetAvatar({ storage, avatar })

        if (response.statusCode === 200) {
          storage.iAvatarImageSet = true
          storage.avatarImage = response.image
          LocalStorage.Set(JSON.stringify(storage))
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, 'We cant set the avatar')
      }
    }
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
              onClick={() => handleOnClickAvatar(index)}
            />
          </div>
        )
      })
    )
  }

  const AvatarPick = (
    <>
      <div className="title-container">
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className="avatars">{RenderAvatarsOrError()}</div>
      {!avatars.loading && (
        <CustomButton
          type={'submit'}
          text={'Set as Profile Avatar'}
          onClick={(event) => handleOnClickSelectAvatar(event)}
        />
      )}
    </>
  )

  return <CustomContainer>{avatars.loading ? <CustomLoader /> : AvatarPick}</CustomContainer>
}

export default Avatar
