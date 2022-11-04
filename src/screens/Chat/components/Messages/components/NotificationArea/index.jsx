import React, { useEffect, useState } from 'react'
import * as IconlyPack from 'react-iconly'

import { CustomTypes } from 'common'
import { CustomPopUp, CustomUserBadge } from 'components'
import { GetRandomElementFromList, GetRandomNumber } from 'helpers/random'

import './style.css'
import { Badge, Dropdown, Avatar } from '@nextui-org/react'
import { UsersAPI } from 'api/Users'
import Console from 'helpers/console'

const ChatMessagesNotification = ({ selected }) => {
  const [onlineUsers, setOnlineUsers] = useState([])
  //Son los usuarios activos en el Grupo, que tengan menos de 5 min
  //Desde la ultima actividad
  //SOCKET
  const arrayOfColors = Object.keys(CustomTypes.ColorsButton)

  useEffect(() => {
    const LoadOnlineUsers = async () => {
      try {
        if (selected.data) {
          const { statusCode, response } =
            selected.type === CustomTypes.ChatType.group
              ? await UsersAPI.GetOnlineUsers(selected.data.id)
              : await UsersAPI.GetOneById(selected.data.id)

          if (statusCode === 200) {
            Console.Log('useEffect -> Cargando usuarios Online')
            setOnlineUsers(response)
          }
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `LoadOnlineUsers... ${error}`)
      }
    }
    LoadOnlineUsers()
  }, [selected])

  const MenuDropDown = (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar icon={<IconlyPack.MoreCircle className="menu-icons" set="bold" />} squared />
      </Dropdown.Trigger>
      <Dropdown.Menu color="secondary" aria-label="Actions">
        <Dropdown.Item key="delete" color="error" command="⌘⇧D">
          Delete file
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

  return (
    <div className="messages-notification">
      <div className="active-users">
        {onlineUsers.map((user, index) => {
          const color = GetRandomElementFromList(arrayOfColors)
          const number = GetRandomNumber(10)

          const size = {
            sizeAvatar: CustomTypes.Sizes.sm,
            sizeNotification: CustomTypes.Sizes.sm,
            sizeStatus: CustomTypes.Sizes.sm,
          }

          return (
            <CustomUserBadge
              clickeable={false}
              key={index}
              user={user}
              color={color}
              pendingMessages={number}
              status={user.id % 2 === 0 ? CustomTypes.BadgeVariants.dot : CustomTypes.BadgeVariants.points}
              showDetails={false}
              size={size}
            />
          )
        })}
      </div>
      <div className="options">
        <Badge color="error" content="9+" shape="circle" size={CustomTypes.Sizes.sm} isInvisible="false">
          <Avatar icon={<IconlyPack.Notification className="menu-icons" set="bold" />} squared />
        </Badge>
        {MenuDropDown}
      </div>
    </div>
  )
}

export default ChatMessagesNotification
