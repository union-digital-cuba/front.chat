import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Card } from '@nextui-org/react'

import { UsersAPI } from 'api/Users'
import { GroupsAPI } from 'api/Groups'

import { CustomPopUp } from 'components'
import { CustomTypes } from 'common'
import { ChatGroups, ChatMessages, ChatNotification, ChatUsers } from '../components'

import './style.css'

const ChatDesktop = ({ user }) => {
  const history = useHistory()

  const [users, setUsers] = useState({ loading: true, data: [] })
  const [groups, setGroups] = useState({ loading: true, data: [] })
  const [selected, SetSelected] = useState({ type: null, index: null })

  useEffect(() => {
    const LoadGroupsBelongToUser = async () => {
      try {
        if (user) {
          console.log('useEffect -> Cargando Grupos que pertenecen a un usuario', user)

          const { statusCode, response } = await GroupsAPI.GetAllByUserId(user.id)
          if (statusCode === 200) {
            setGroups({ loading: false, data: response })
          }
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `Error loading groups... ${error}`)
      }
    }
    LoadGroupsBelongToUser()
  }, [])

  useEffect(() => {
    const LoadUsersFromGroup = async () => {
      try {
        if (!user) history.push('/login')

        if (selected.id !== null) {
          if (selected.type === CustomTypes.ChatType.group) {
            console.log('useEffect -> Cargando usuarios del grupo', selected)

            //cuando marco un grupo cargo todos los usuarios del grupo
            const groupId = groups[selected.index]
            const { statusCode, response } = await UsersAPI.GetUsersByGroup(groupId, user.id)
            if (statusCode === 200) {
              setUsers({ loading: false, data: response })
            }
          } else {
            //en caso que marque un usuario
            setUsers({ loading: false, data: [] })
          }
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `Error loading users... ${error}`)
      }
    }
    LoadUsersFromGroup()
  }, [selected])

  const handleSelected = (selection) => {
    console.log('handleSelected -> cambiando seleccion', selection)
    SetSelected(selection)
  }

  const ChatComponents = (
    <div className="chat-body-container">
      <div className="chat-groups">
        <ChatGroups groups={groups} handleSelectGroup={handleSelected} />
      </div>
      <div className="chat-messages">
        <ChatMessages
          users={users}
          user={user}
          selected={selected.type === CustomTypes.ChatType.group ? groups[selected.index] : selected}
          kind={selected.type}
        />
      </div>
      <div className="chat-users">
        <ChatUsers users={users} handleSelectUser={handleSelected} />
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
