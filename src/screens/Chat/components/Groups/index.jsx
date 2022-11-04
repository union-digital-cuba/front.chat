import React, { useState, useEffect } from 'react'

import { Loading, Input } from '@nextui-org/react'
import * as IconlyPack from 'react-iconly'
import { CustomGroupBadge } from 'components'
import { CustomTypes } from 'common'
import './style.css'
import { GetRandomElementFromList, GetRandomNumber } from 'helpers/random'

const ChatGroups = ({ groups, handleSelectGroup }) => {
  const [search, setSearch] = useState({ loading: groups.loading, data: [...groups.data] })

  useEffect(() => {
    const LoadGroupsToSearch = () => {
      setSearch({ loading: groups.loading, data: [...groups.data] })
    }
    LoadGroupsToSearch()
  }, [groups])

  const onSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
    if (value) {
      const filtered = groups.data.filter((p) => p.name.includes(value))
      console.log(value, filtered)
      setSearch({ loading: false, data: [...filtered] })
    } else setSearch({ loading: false, data: [...groups.data] })
  }

  const GetLoading = <Loading color="error">Loading...</Loading>
  const GetGroups = () => {
    const arrayOfColors = Object.keys(CustomTypes.ColorsButton)

    return search.data.map((group, index) => {
      const color = GetRandomElementFromList(arrayOfColors)
      const number = GetRandomNumber(10)

      const size = {
        sizeAvatar: CustomTypes.Sizes.md,
        sizeNotification: CustomTypes.Sizes.md,
        sizeStatus: CustomTypes.Sizes.md,
      }

      return (
        <CustomGroupBadge
          clickeable={true}
          key={index}
          group={group}
          color={color}
          pendingMessages={number}
          status={group.id % 2 === 0 ? CustomTypes.BadgeVariants.dot : CustomTypes.BadgeVariants.points}
          showDetails={true}
          size={size}
          handleOnClick={() => handleSelectGroup({ type: CustomTypes.ChatType.group, data: group })}
        />
      )
    })
  }

  const GroupComponent = () => {
    const SearchIcon = <IconlyPack.Search set="bulk" />

    return (
      <>
        <div className="search-bar">
          <Input
            clearable
            color="secondary"
            placeholder="Search..."
            contentRight={search.loading ? <Loading size="xs" /> : SearchIcon}
            onKeyDown={(e) => {
              e.key === 'Enter' && onSearch(e)
            }}
            onClearClick={() => setSearch({ loading: groups.loading, data: [...groups.data] })}
          />
        </div>
        <div className="content">{GetGroups()}</div>
      </>
    )
  }

  return <div className="chat-group-container">{groups.loading ? GetLoading : GroupComponent()}</div>
}

export default ChatGroups
