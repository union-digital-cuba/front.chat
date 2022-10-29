import React from 'react'

import { User, Loading } from '@nextui-org/react'
import { GetImage } from 'helpers/images'

import './style.css'

const ChatUsers = ({ users }) => {
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
