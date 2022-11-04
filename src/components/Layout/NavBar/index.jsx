import React from 'react'
import { useHistory } from 'react-router-dom'

import { Navbar, Text, Button, Tooltip, Dropdown, Avatar } from '@nextui-org/react'
import { SunIcon, MoonIcon } from 'components/Icons'
import useDarkMode from 'use-dark-mode'
import AcmeLogo from 'components/Icons/logo'

//TODO: Cambiar el logo luego
// import AcmeLogo from 'assets/images/acme.svg'
import './style.css'
import useAuth from 'hooks/useAuth'
import { GetImage } from 'helpers/images'

const CustomNavBar = () => {
  const darkMode = useDarkMode(false)
  const history = useHistory()

  const auth = useAuth()

  const handleDropdownActionKey = ({ actionKey }) => {
    if (actionKey === 'logout') {
      auth.ClearUser()
      history.push('/login')
    }

    if (actionKey === 'change_avatar') {
      history.push('/avatar')
    }
  }

  const ColorMode = (
    <Tooltip content={`${darkMode.value ? 'Light' : 'Dark'} Mode`} color={'invert'} placement="bottom">
      <Button light auto onClick={() => darkMode.toggle()} icon={darkMode.value ? <SunIcon /> : <MoonIcon />} />
    </Tooltip>
  )

  const UserData = (
    <Dropdown placement="bottom-right">
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar bordered as="button" color="primary" size="md" src={GetImage(auth.GetAvatar())} />
        </Dropdown.Trigger>
      </Navbar.Item>
      <Dropdown.Menu
        aria-label="User menu actions"
        color="secondary"
        onAction={(actionKey) => handleDropdownActionKey({ actionKey })}
      >
        <Dropdown.Item key="profile" css={{ height: '$18' }}>
          <Text b color="inherit" css={{ d: 'flex' }}>
            Signed in as
          </Text>
          <Text b color="inherit" css={{ d: 'flex' }}>
            {auth.GetUser()?.email}
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="change_avatar" withDivider>
          Change Avatar
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
        {auth.GetUser() && UserData}
      </Navbar.Content>
    </Navbar>
  )
}

export default CustomNavBar
