import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useViewport } from 'context/ViewportProvider'
import useAuth from 'hooks/useAuth'

import { CustomLayout } from 'components'

import ChatDesktop from './desktop'
import ChatMobile from './mobile'

const Chat = () => {
  const history = useHistory()

  const user = useAuth().GetUser()

  const { width } = useViewport()
  const breakpoint = 600

  useEffect(() => {
    const CheckLocalStorage = async () => {
      if (!user) history.push('/login')
      if (!user?.isSetAvatar) history.push('/avatar')
    }
    CheckLocalStorage()
  }, [])

  const GetComponentDependingViewportWidth = () => {
    const isMobile = width < breakpoint
    return isMobile ? ChatMobile({ user }) : ChatDesktop({ user })
  }

  return <CustomLayout>{GetComponentDependingViewportWidth()}</CustomLayout>
}

export default Chat
