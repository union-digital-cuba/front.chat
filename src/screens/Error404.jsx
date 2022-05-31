import React from 'react'
import { Header, Icon, Image } from 'semantic-ui-react'

const Error404 = () => {
  return (
    <div>
      <Header as="h2" icon textAlign="center">
        <Icon name="plug" circular />
        <Header.Content>404</Header.Content>
        <Header.Subheader>Page Not Found, Shit...</Header.Subheader>
        <Image centered size="large" src="../assets/images/error-404.avif" />
      </Header>
    </div>
  )
}

export default Error404
