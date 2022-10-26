import React, { useState, useEffect } from 'react'

import { Navbar, Text, Button, Tooltip, Dropdown, Avatar } from '@nextui-org/react'
import { SunIcon, MoonIcon } from 'components/Icons'
import useDarkMode from 'use-dark-mode'
import AcmeLogo from 'components/Icons/logo'

import { LocalStorage } from 'common'

//TODO: Cambiar el logo luego
// import AcmeLogo from 'assets/images/acme.svg'
import './style.css'

const CustomNavBar = () => {
  const darkMode = useDarkMode(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const CheckLocalStorage = async () => {
      const storage = await JSON.parse(LocalStorage.Get())
      if (storage) setUserData(storage)
    }
    CheckLocalStorage()
  }, [])

  const ColorMode = (
    <Tooltip
      content={`Toggle to ${darkMode.value ? 'light' : 'dark'} mode`}
      color={!darkMode.value && 'invert'}
      placement="bottom"
    >
      <Button light auto onClick={() => darkMode.toggle()} icon={darkMode.value ? <SunIcon /> : <MoonIcon />} />
    </Tooltip>
  )

  const UserData = (
    <Dropdown placement="bottom-right">
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar
            bordered
            as="button"
            color="primary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </Dropdown.Trigger>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="User menu actions"
        color="secondary"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <Dropdown.Item key="profile" css={{ height: '$18' }}>
          <Text b color="inherit" css={{ d: 'flex' }}>
            Signed in as
          </Text>
          <Text b color="inherit" css={{ d: 'flex' }}>
            zoey@example.com
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="settings" withDivider>
          My Settings
        </Dropdown.Item>
        <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
        <Dropdown.Item key="analytics" withDivider>
          Analytics
        </Dropdown.Item>
        <Dropdown.Item key="system">System</Dropdown.Item>
        <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
        <Dropdown.Item key="help_and_feedback" withDivider>
          Help & Feedback
        </Dropdown.Item>
        <Dropdown.Item key="logout" withDivider color="error">
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )

  return (
    <Navbar isCompact isBordered variant="sticky">
      <Navbar.Brand
        css={{
          '@xs': {
            w: '12%',
          },
        }}
      >
        <AcmeLogo />
        <Text b color="inherit">
          Stuch
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        css={{
          '@xsMax': {
            w: '12%',
            jc: 'flex-end',
          },
        }}
      >
        {ColorMode}
        {userData && UserData}
      </Navbar.Content>
    </Navbar>
  )
}

export default CustomNavBar
