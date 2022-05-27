import React from 'react';
import logo from '../images/logo.png';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

function Login(props) {
  return (
    <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src={logo} /> Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Nombre de Usuario'
              name='userName'
              value={props.userName}
              onChange={props.handleInputValueChange}
            />
            <Button color='teal' fluid size='large' disabled={props.userName === ''} onClick={(event) => { props.login(event) }}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Login;