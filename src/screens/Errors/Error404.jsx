import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const styles = {
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
}

const Error404 = () => {
  return (
    <div style={styles.centerContainer}>
      <Header as="h2" icon textAlign="center">
        <Icon name="plug" circular />
        <Header.Content>404</Header.Content>
        <Header.Subheader>Page Not Found, Shit...</Header.Subheader>
      </Header>
    </div>
  )
}

export default Error404
