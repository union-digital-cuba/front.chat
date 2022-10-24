import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Register, Login, Error404, Chat, Avatar } from 'screens'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/login'} component={Login} />
        <Route exact path={'/avatar'} component={Avatar} />
        <Route exact path={'/'} component={Chat} />
        <Route path={'*'} component={Error404} />
      </Switch>
    </Router>
  )
}

export default AppRouter
