import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Card } from '@nextui-org/react'

import { UsersAPI } from 'api/Users'
import { GroupsAPI } from 'api/Groups'

import { CustomPopUp } from 'components'
import { CustomTypes } from 'common'
import { ChatGroups, ChatMessages, ChatNotification, ChatUsers } from '../components'

import { MockMessages } from 'helpers/mocks'

import './style.css'

const ChatDesktop = ({ user }) => {
  const history = useHistory()

  const [users, setUsers] = useState({ loading: true, data: [] })
  const [groups, setGroups] = useState({ loading: true, data: [] })
  const [messages, setMessages] = useState({ loading: true, data: [] })
  const [selectedGroup, SetSelectedGroup] = useState(null)

  useEffect(() => {
    const LoadGroupsBelongToUser = async () => {
      try {
        if (user) {
          const { statusCode, response } = await GroupsAPI.GetAllByUserId(user.id)
          if (statusCode === 200) {
            setGroups({ loading: false, data: response })
          }
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `Error loading groups... ${error}`)
      }
    }
    const LoadMessages = async () => {
      setMessages({ loading: false, data: MockMessages })
    }
    LoadGroupsBelongToUser()
    LoadMessages()
  }, [])

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
        <ChatGroups groups={groups} handleSelectGroup={handleSelectGroup} />
      </div>
      <div className="chat-messages">
        <ChatMessages users={users} messages={messages} />
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
