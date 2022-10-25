import React from 'react'

import { Navbar, Text, Switch } from '@nextui-org/react'
import { SunIcon, MoonIcon } from 'components/Icons'
import useDarkMode from 'use-dark-mode'
import AcmeLogo from 'components/Icons/logo'

//TODO: Cambiar el logo luego
// import AcmeLogo from 'assets/images/acme.svg'

const CustomNavBar = () => {
  const darkMode = useDarkMode(false)

  return (
    <Navbar isCompact isBordered variant="sticky">
      <Navbar.Brand css={{ mr: '$4' }}>
        <AcmeLogo />
        <Text b color="inherit" hideIn="xs">
          Stuch
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        css={{
          '@xsMax': {
            w: '100%',
            jc: 'space-between',
          },
        }}
      >
        <Switch
          size="xl"
          iconOn={<SunIcon filled />}
          iconOff={<MoonIcon filled />}
          checked={darkMode.value}
          onChange={() => darkMode.toggle()}
        />

        {/* <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Sign Up
          </Button>
        </Navbar.Item> */}
      </Navbar.Content>
    </Navbar>
  )
}

export default CustomNavBar
