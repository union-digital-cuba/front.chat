import React, { useState, useMemo, memo } from 'react'

import { Loading, Input } from '@nextui-org/react'
import { GetRandomElementFromList, GetRandomNumber } from 'helpers/random'
import { CustomTypes } from 'common'
import { CustomUserBadge } from 'components'
import * as IconlyPack from 'react-iconly'

import './style.css'

const ChatUsers = memo(({ users, handleSelectUser }) => {
  const [search, setSearch] = useState('')

  const arrayOfColors = Object.keys(CustomTypes.ColorsButton)
  const filteredUsers = useMemo(
    () => users.data.filter((p) => p.username?.toLowerCase().includes(search?.toLowerCase())),
    [users, search]
  )

  const onSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
    setSearch(value)
  }

  const GetLoading = <Loading color="error">Loading...</Loading>

  const GetChatUsersContainer = () => {
    return filteredUsers.map((user, index) => {
      const color = GetRandomElementFromList(arrayOfColors)
      const number = GetRandomNumber(10)

      const size = {
        sizeAvatar: CustomTypes.Sizes.md,
        sizeNotification: CustomTypes.Sizes.md,
        sizeStatus: CustomTypes.Sizes.md,
      }

      return (
        <CustomUserBadge
          clickeable={true}
          key={index}
          user={user}
          color={color}
          pendingMessages={number}
          status={user.id % 2 === 0 ? CustomTypes.BadgeVariants.dot : CustomTypes.BadgeVariants.points}
          showDetails={true}
          size={size}
          handleOnClick={() => handleSelectUser({ type: CustomTypes.ChatType.user, data: user })}
        />
      )
    })
  }

  const UsersComponent = () => {
    const SearchIcon = <IconlyPack.Search set="bulk" />

    return (
      <>
        <div className="search-bar">
          <Input
            clearable
            color="secondary"
            placeholder="Search..."
            contentRight={SearchIcon}
            onKeyDown={(e) => {
              e.key === 'Enter' && onSearch(e)
            }}
            onClearClick={() => setSearch('')}
          />
        </div>
        <div className="content">{GetChatUsersContainer()}</div>
      </>
    )
  }

  return <div className="chat-users-container">{users.loading ? GetLoading : UsersComponent()}</div>
})

ChatUsers.displayName = 'ChatUsers'

export default ChatUsers
