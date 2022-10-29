import React, { useState, useEffect } from 'react'

import { Card } from '@nextui-org/react'

import { UsersAPI } from 'api/Users'
import { CustomPopUp } from 'components'
import { CustomTypes } from 'common/CustomTypes'
import { ChatGroups, ChatMessages, ChatNotification, ChatUsers } from '../components'

import './style.css'

const ChatDesktop = () => {
  const [selectedGroup, SetSelectedGroup] = useState(null)
  const [users, setUsers] = useState({ loading: true, data: [] })

  //cargar todos los usuarios pertenecientes a este grupo
  useEffect(() => {
    const LoadUsersFromGroup = async () => {
      try {
        if (selectedGroup !== null) {
          const { statusCode, response } = await UsersAPI.GetUsersByGroup(selectedGroup)
          if (statusCode === 200) {
            setUsers({ loading: false, data: response })
          }
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `Error loading users... ${error}`)
      }
    }
    LoadUsersFromGroup()
  }, [selectedGroup])

  const handleSelectGroup = (id) => {
    console.log('handleSelectGroup', id)
    SetSelectedGroup(id)
  }

  const ChatComponents = (
    <div className="chat-body-container">
      <div className="chat-groups">
        <ChatGroups handleSelectGroup={handleSelectGroup} />
      </div>
      <div className="chat-messages">
        <ChatMessages />
      </div>
      <div className="chat-users">
        <ChatUsers users={users} />
      </div>
    </div>
  )

  const ChatWindow = (
    <Card variant="bordered" isHoverable>
      <Card.Header css={{ jc: 'center' }}>
        <ChatNotification />
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: '$2' }}>{ChatComponents}</Card.Body>
    </Card>
  )

  return <div className="chat-main-container">{ChatWindow}</div>
}

export default ChatDesktop
