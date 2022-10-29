import React from 'react'

import { User, Loading } from '@nextui-org/react'
import { GetImage } from 'helpers/images'
import { GetRandomElementFromList } from 'helpers/random'
import { CustomTypes } from 'common'

import './style.css'

const ChatUsers = ({ users }) => {
  return (
    <div className="chat-users-container">
      {users.loading ? (
        <Loading type="points" />
      ) : (
        users.data.map((user, index) => {
          const arrayOfColors = Object.keys(CustomTypes.ColorsButton)
          const color = GetRandomElementFromList(arrayOfColors)
          return (
            <User
              className="user-info"
              key={index}
              bordered
              color={color}
              src={GetImage(user.image)}
              name={user.username}
              pointer
            >
              <User.Link className="link-info" href="https://nextui.org/">{`${user.email}`}</User.Link>
            </User>
          )
        })
      )}
    </div>
  )
}

export default ChatUsers
