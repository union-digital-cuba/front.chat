import React, { useEffect, useState } from 'react'

import { Collapse, Avatar, Text, Loading } from '@nextui-org/react'

import { GroupsAPI } from 'api/Groups'
import { CustomPopUp } from 'components'
import { CustomTypes } from 'common/CustomTypes'
import { GetImage } from 'helpers/images'
import { LocalStorage } from 'common'

import './style.css'

const ChatGroups = () => {
  const [groups, setGroups] = useState({ loading: true, data: [] })

  //cargar todos los grupos pertenecientes al usuario
  useEffect(() => {
    const LoadGroupsBelongToUser = async () => {
      try {
        const storage = JSON.parse(LocalStorage.Get())
        if (storage) {
          const { statusCode, response } = await GroupsAPI.GetAllByUserId(storage.id)
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
        key={index}
        title={<Text h4>{group.name}</Text>}
        subtitle="4 unread messages"
        contentLeft={<Avatar size="lg" src={GetImage(group.image)} color="secondary" bordered squared />}
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
