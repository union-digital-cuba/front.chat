import React, { useState, useMemo, memo } from 'react'

import { Loading, Input } from '@nextui-org/react'
import * as IconlyPack from 'react-iconly'
import { CustomGroupBadge } from 'components'
import { CustomTypes } from 'common'
import './style.css'
import { GetRandomElementFromList, GetRandomNumber } from 'helpers/random'

const ChatGroups = memo(({ groups, handleSelectGroup }) => {
  const [search, setSearch] = useState('')

  const filteredGroups = useMemo(() => {
    return groups.data.filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
  }, [groups, search])

  const onSearch = (e) => {
    e.preventDefault()
    const value = e.target.value
    setSearch(value)
  }

  const GetLoading = <Loading color="error">Loading...</Loading>
  const GetGroups = () => {
    const arrayOfColors = Object.keys(CustomTypes.ColorsButton)

    return filteredGroups.map((group, index) => {
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
            contentRight={SearchIcon}
            onKeyDown={(e) => {
              e.key === 'Enter' && onSearch(e)
            }}
            onClearClick={() => setSearch('')}
          />
        </div>
        <div className="content">{GetGroups()}</div>
      </>
    )
  }

  return <div className="chat-group-container">{groups.loading ? GetLoading : GroupComponent()}</div>
})

ChatGroups.displayName = 'ChatGroups'

export default ChatGroups
