import React from 'react'

import { Navbar, Button, Link, Text } from '@nextui-org/react'

//TODO: Cambiar el logo luego
import AcmeLogo from 'assets/images/acme.svg'

const CustomNavBar = () => {
  return (
    <Navbar isCompact isBordered variant="sticky">
      <Navbar.Brand>
        <AcmeLogo />
        <Text b color="inherit" hideIn="xs">
          Stuch
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline"></Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Sign Up
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  )
}

export default CustomNavBar
