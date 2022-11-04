import React, { useState, useEffect } from 'react'

import { Loading, Input } from '@nextui-org/react'
import { GetRandomElementFromList, GetRandomNumber } from 'helpers/random'
import { CustomTypes } from 'common'
import { CustomUserBadge } from 'components'
import * as IconlyPack from 'react-iconly'

import './style.css'

const ChatUsers = ({ users, handleSelectUser }) => {
  const [search, setSearch] = useState({ loading: users.loading, data: [...users.data] })

  useEffect(() => {
    const LoadUsersToSearch = () => {
      setSearch({ loading: users.loading, data: [...users.data] })
    }
    LoadUsersToSearch()
  }, [users])

  const onSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
    if (value) {
      const filtered = users.data.filter((p) => p.username.includes(value))
      setSearch({ loading: false, data: [...filtered] })
    } else setSearch({ loading: false, data: [...users.data] })
  }

  const arrayOfColors = Object.keys(CustomTypes.ColorsButton)

  const GetLoading = <Loading color="error">Loading...</Loading>
  const GetChatUsersContainer = () => {
    return search.data.map((user, index) => {
      const color = GetRandomElementFromList(arrayOfColors)
      const number = GetRandomNumber(10)

      const size = {
        sizeAvatar: CustomTypes.Sizes.md,
        sizeNotification: CustomTypes.Sizes.md,
        sizeStatus: CustomTypes.Sizes.md,
      }

      return (
        <CustomUserBadge
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
        <div className="user-search-bar">
          <Input
            clearable
            color="secondary"
            placeholder="Search..."
            contentRight={search.loading ? <Loading size="xs" /> : SearchIcon}
            onKeyDown={(e) => {
              e.key === 'Enter' && onSearch(e)
            }}
            onClearClick={() => setSearch({ loading: users.loading, data: [...users.data] })}
          />
        </div>
        <div className="user-content">{GetChatUsersContainer()}</div>
      </>
    )
  }

  return <div className="chat-users-container">{users.loading ? GetLoading : UsersComponent()}</div>
}

export default ChatUsers
