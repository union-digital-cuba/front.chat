import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Card } from '@nextui-org/react'
import { ChatGroups, ChatMessages, ChatNotification, ChatUsers } from '../components'

import { UsersAPI } from 'api/Users'
import { CustomPopUp } from 'components'

import './style.css'
import { CustomTypes } from 'common'

const ChatDesktop = ({ user }) => {
  const history = useHistory()

  const [selectedGroup, SetSelectedGroup] = useState(null)
  const [users, setUsers] = useState({ loading: true, data: [] })

  useEffect(() => {
    const LoadUsersFromGroup = async () => {
      try {
        if (!user) history.push('/login')

        if (selectedGroup !== null) {
          const { statusCode, response } = await UsersAPI.GetUsersByGroup(selectedGroup, user.id)
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
    SetSelectedGroup(id)
  }

  const ChatComponents = (
    <div className="chat-body-container">
      <div className="chat-groups">
        <ChatGroups user={user} handleSelectGroup={handleSelectGroup} />
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
      <Card.Body css={{ py: '$2', p: '5px' }}>{ChatComponents}</Card.Body>
    </Card>
  )

  return <div className="chat-main-container">{ChatWindow}</div>
}

export default ChatDesktop
