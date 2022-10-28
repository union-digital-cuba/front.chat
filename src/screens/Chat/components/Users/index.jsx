import React, { useEffect, useState } from 'react'

import { UsersAPI } from 'api/Users'
import { User, Loading } from '@nextui-org/react'
import { CustomPopUp } from 'components'
import { CustomTypes } from 'common/CustomTypes'

import './style.css'
import { GetImage } from 'helpers/images'

const ChatUsers = ({ selectedGroup }) => {
  const [users, setUsers] = useState({ loading: true, data: [] })

  //cargar todos los usuarios pertenecientes a este grupo
  useEffect(() => {
    const LoadUsersFromGroup = async () => {
      try {
        if (selectedGroup) {
          const response = await UsersAPI.GetUsersByGroup(selectedGroup)
          setUsers({ loading: false, data: response })
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `Error loading users... ${error}`)
      }
    }
    LoadUsersFromGroup()
  }, [])

  return (
    <div className="chat-users-container">
      {users.loading ? (
        <Loading type="points" />
      ) : (
        users.data.map((user, index) => {
          return (
            <User key={index} src={GetImage(user.image)} name={user.username}>
              <User.Link href="https://nextui.org/">{`@${user.username}`}</User.Link>
            </User>
          )
        })
      )}
    </div>
  )
}

export default ChatUsers
