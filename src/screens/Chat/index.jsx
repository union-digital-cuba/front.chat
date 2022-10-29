import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { LocalStorage } from 'common'
import { CustomLayout } from 'components'
import { useViewport } from 'context/ViewportProvider'
import ChatDesktop from './desktop'
import ChatMobile from './mobile'

const Chat = () => {
  const history = useHistory()

  const { width } = useViewport()
  const breakpoint = 600

  useEffect(() => {
    const CheckLocalStorage = async () => {
      const storage = await JSON.parse(LocalStorage.Get())
      if (!storage) history.push('/login')
      if (!storage?.isSetAvatar) history.push('/avatar')
    }
    CheckLocalStorage()
  }, [])

  const GetComponentDependingViewportWidth = () => {
    const isMobile = width < breakpoint
    return isMobile ? ChatMobile() : ChatDesktop()
  }

  return <CustomLayout>{GetComponentDependingViewportWidth()}</CustomLayout>
}

export default Chat
