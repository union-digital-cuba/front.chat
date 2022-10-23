import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { AvatarAPI } from 'api/Avatar'
import { CustomContainer, CustomErrorInScreen, CustomButton, CustomLoader, CustomPopUp } from 'components'
import { GetImage } from 'helpers/images'
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
      const amountAvatarsToLoad = 4
      try {
        // const multiavatars = await MultiAvatarAPI.GetRandomAvatar({ amount })
        // setAvatars({ loading: false, error: false, data: [...multiavatars] })
        throw Error()
      } catch (multiError) {
        try {
          const avatarsFormApi = await AvatarAPI.GetAvatars({ amount: amountAvatarsToLoad })
          setAvatars({ loading: false, error: false, data: [...avatarsFormApi] })
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
          history.push('/')
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
        return (
          <div key={index} className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}>
            <img src={GetImage(avatar)} alt="avatar" onClick={() => handleOnClickAvatar(index)} />
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
