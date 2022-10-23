import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { MultiAvatarAPI, AvatarAPI } from 'api/Avatar'
import { CustomContainer, CustomErrorInScreen, CustomButton, CustomLoader, CustomPopUp } from 'components'
import { GetTakeLocalAvatars } from 'helpers/avatars'
import { GetSrcDependingOfType } from 'helpers/images'
import { CustomTypes } from 'common/CustomTypes'
import { LocalStorage } from 'common'

import './style.css'

const Avatar = () => {
  const history = useHistory()

  const [selectedAvatar, setSelectedAvatar] = useState()
  const [avatars, setAvatars] = useState({ loading: true, error: undefined, data: [] })

  useEffect(() => {
    const CheckLocalStorage = async () => {
      const storage = await JSON.parse(LocalStorage.Get())
      if (!storage) history.push('/login')
    }
    CheckLocalStorage()
  }, [])

  useEffect(() => {
    const LoadAvatars = async () => {
      const ammountAvatarsToLoad = 4
      try {
        const multiavatars = await MultiAvatarAPI.GetRandomAvatar({ amount: ammountAvatarsToLoad })
        setAvatars({ loading: false, error: false, data: [...multiavatars], web: true })
      } catch (multiError) {
        try {
          var assetsAvatars = GetTakeLocalAvatars(ammountAvatarsToLoad)
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
    if (!selectedAvatar) CustomPopUp(CustomTypes.PopUp.Icon.info, 'Please, select a avatar...')
    else {
      try {
        const storage = await JSON.parse(LocalStorage.Get())
        const avatar = avatars.data[selectedAvatar]
        const response = await AvatarAPI.SetAvatar({ user: storage, avatar })

        if (response.statusCode === 200) {
          storage.isSetAvatar = true
          storage.image = response.image
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
        var imageType = avatars.web ? CustomTypes.ImageTypes.web : CustomTypes.ImageTypes.local

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
          handleOnClick={() => handleOnClickSelectAvatar()}
        />
      )}
    </>
  )

  return <CustomContainer>{avatars.loading ? <CustomLoader /> : AvatarPick}</CustomContainer>
}

export default Avatar
