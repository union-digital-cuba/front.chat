import React, { useEffect, useState } from 'react'

import { Collapse, Avatar, Text, Loading } from '@nextui-org/react'

import { GroupsAPI } from 'api/Groups'
import { CustomPopUp } from 'components'
import { CustomTypes } from 'common/CustomTypes'
import { GetImage } from 'helpers/images'
import './style.css'

const ChatGroups = ({ user, handleSelectGroup }) => {
  const [groups, setGroups] = useState({ loading: true, data: [] })

  useEffect(() => {
    const LoadGroupsBelongToUser = async () => {
      try {
        if (user) {
          const { statusCode, response } = await GroupsAPI.GetAllByUserId(user.id)
          if (statusCode === 200) {
            setGroups({ loading: false, data: response })
          }
        }
      } catch (error) {
        CustomPopUp(CustomTypes.PopUp.Icon.error, `Error loading groups... ${error}`)
      }
    }
    LoadGroupsBelongToUser()
  }, [])

  const GroupCollapse = (group, index) => {
    return (
      <Collapse
        className="group-info"
        showArrow={false}
        key={index}
        onClick={handleSelectGroup(index)}
        title={<Text h4>{group.name}</Text>}
        subtitle={`${group.amount} users`}
        contentLeft={<Avatar size="lg" src={GetImage(group.image)} color="secondary" bordered />}
      >
        <Text>Last Chat from a Group</Text>
      </Collapse>
    )
  }

  return (
    <div className="chat-group-container">
      {groups.loading ? (
        <Loading type="points" />
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
