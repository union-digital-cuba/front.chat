import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Text, Avatar } from '@nextui-org/react'

import { AvatarAPI, MultiAvatarAPI } from 'api/Avatar'
import { CustomErrorInScreen, CustomLayout, CustomLoader, CustomPopUp } from 'components'
import useDarkMode from 'use-dark-mode'
import { GetImage } from 'helpers/images'
import useAuth from 'hooks/useAuth'
import { LocalStorage, CustomTypes } from 'common'

import './style.css'

const ScreenAvatar = () => {
  const darkMode = useDarkMode(false)
  const history = useHistory()

  const auth = useAuth()
  const user = auth.GetUser()

  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [avatars, setAvatars] = useState({ loading: true, error: undefined, data: [] })

  useEffect(() => {
    const CheckLocalStorage = async () => {
      if (!user) history.push('/login')
      if (user?.isSetAvatar) history.push('/')
    }
    CheckLocalStorage()
  }, [])

  useEffect(() => {
    const LoadAvatars = async () => {
      const amountAvatarsToLoad = 4
      try {
        const multiavatars = await MultiAvatarAPI.GetRandomAvatar({ amount: amountAvatarsToLoad })
        setAvatars({ loading: false, error: false, data: [...multiavatars] })
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
    auth.ChangeAvatar(avatars.data[index])
  }

  const handleOnClickSelectAvatar = async () => {
    if (selectedAvatar === null) CustomPopUp(CustomTypes.PopUp.Icon.info, 'Please, select a avatar...')
    else {
      try {
        const storage = await JSON.parse(LocalStorage.Get())
        const avatar = avatars.data[selectedAvatar]
        const response = await AvatarAPI.SetAvatar({ user: storage, avatar })

        if (response.statusCode === 200) {
          storage.isSetAvatar = true
          storage.image = avatars.data[selectedAvatar]
          LocalStorage.Set(JSON.stringify(storage))
          history.push('/')
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, 'We cant set the avatar')
      }
    }
  }

  const RenderAvatarsOrError = () => {
    const theme = darkMode.dark ? 'dark' : 'light'

    return avatars.error ? (
      <CustomErrorInScreen error={avatars.error} />
    ) : (
      avatars.data.map((avatar, index) => {
        return (
          <Avatar
            className={`avatar avatar-${theme} ${selectedAvatar === index ? 'selected-' + theme : ''}`}
            key={index}
            zoomed
            src={GetImage(avatar)}
            onClick={() => handleOnClickAvatar(index)}
          />
        )
      })
    )
  }

  const AvatarPick = (
    <>
      <div className="title-container">
        <Text h1 css={{ ta: 'center' }}>
          Pick an avatar as your profile picture
        </Text>
      </div>
      <div className="avatars">{RenderAvatarsOrError()}</div>
      {!avatars.loading && (
        <Button type={'submit'} onClick={() => handleOnClickSelectAvatar()}>
          Set as Profile Avatar
        </Button>
      )}
    </>
  )

  return <CustomLayout>{avatars.loading ? <CustomLoader /> : AvatarPick}</CustomLayout>
}

export default ScreenAvatar
