import React from 'react'

import { Collapse, Avatar, Text, Loading } from '@nextui-org/react'

import { CustomBadge } from 'components'
import { CustomTypes } from 'common'
import { GetImage } from 'helpers/images'
import './style.css'

const ChatGroups = ({ groups, handleSelectGroup }) => {
  const GroupCollapse = (group, index) => {
    const GroupDetail = (
      <CustomBadge
        pendingMessages={5}
        status={CustomTypes.BadgeVariants.points}
        sizeNotification={CustomTypes.Sizes.md}
        sizeStatus={CustomTypes.Sizes.md}
      >
        <Avatar size="lg" src={GetImage(group.image)} color="secondary" bordered />
      </CustomBadge>
    )

    return (
      <Collapse
        className="group-info"
        showArrow={false}
        key={index}
        // onClick={handleSelectGroup({ type: CustomTypes.ChatType.group, index: index })}
        // onClick={console.log('change')}
        title={<Text h4>{group.name}</Text>}
        subtitle={`${group.amount} users`}
        contentLeft={GroupDetail}
      >
        <Text>Last Chat from a Group</Text>
      </Collapse>
    )
  }

  return (
    <div className="chat-group-container">
      {groups.loading ? (
        <Loading color="error">Loading...</Loading>
      ) : (
        <Collapse.Group splitted>
          {groups.data.map((group, index) => {
            return GroupCollapse(group, index)
          })}
        </Collapse.Group>
      )}
    </div>
  )
}

export default ChatGroups
