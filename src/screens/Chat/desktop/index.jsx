import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { io } from 'socket.io-client'

import { Card } from '@nextui-org/react'

import { UsersAPI } from 'api/Users'
import { GroupsAPI } from 'api/Groups'

import { CustomPopUp } from 'components'
import { CustomTypes } from 'common'
import { ChatGroups, ChatMessages, ChatNotification, ChatUsers } from '../components'

import './style.css'
import Console from 'helpers/console'

const ChatDesktop = ({ user }) => {
  const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`

  const socket = useRef()
  const history = useHistory()

  const [users, setUsers] = useState({ loading: true, data: [] })
  const [groups, setGroups] = useState({ loading: true, data: [] })
  const [selected, SetSelected] = useState({ type: null, data: null })

  useEffect(() => {
    const LoadGroupsBelongToUser = async () => {
      try {
        if (user) {
          Console.Info('useEffect -> Cargando Grupos que pertenecen a un usuario')

          const { statusCode, response } = await GroupsAPI.GetAllByUserId(user.id)
          if (statusCode === 200) {
            setGroups({ loading: false, data: response })
          }
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `LoadGroupsBelongToUser... ${error}`)
      }
    }
    LoadGroupsBelongToUser()
  }, [])

  useEffect(() => {
    const LoadUsersFromGroup = async () => {
      try {
        if (!user) history.push('/login')

        if (selected.data !== null) {
          if (selected.type === CustomTypes.ChatType.group) {
            Console.Info('useEffect -> Cargando usuarios del grupo')

            //cuando marco un grupo cargo todos los usuarios del grupo
            const groupId = selected.data.id
            const { statusCode, response } = await UsersAPI.GetUsersByGroup(groupId, user.id)
            if (statusCode === 200) {
              socket.current.emit('join', groupId)
              setUsers({ loading: false, data: response })
            }
          } else {
            //en caso que marque un usuario
            setUsers({ loading: false, data: [] })
          }
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `LoadUsersFromGroup... ${error}`)
      }
    }
    LoadUsersFromGroup()
  }, [selected])

  useEffect(() => {
    if (user) {
      socket.current = io(url)
      socket.current.emit('add-user', user)
    }
  }, [user])

  const handleSelected = (selection) => {
    Console.Info('handleSelected -> cambiando seleccion')
    if (JSON.stringify(selection) !== JSON.stringify(selected)) SetSelected(selection)
  }

  const ChatUser = (
    <div className="chat-users">
      <ChatUsers users={users} handleSelectUser={handleSelected} />
    </div>
  )

  const ChatComponents = (
    <div className="chat-body-container">
      <div className="chat-groups">
        <ChatGroups groups={groups} handleSelectGroup={handleSelected} />
      </div>
      <div className="chat-messages">
        <ChatMessages user={user} selected={selected} socket={socket} />
      </div>
      {selected.type === CustomTypes.ChatType.group && ChatUser}
    </div>
  )

  const ChatWindow = (
    <Card variant="bordered">
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
