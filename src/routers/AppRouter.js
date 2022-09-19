import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Register, Error404, Chat } from 'screens'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={'/register'} component={Register} />
        <Route path={'/'} component={Chat} />
        <Route path={'*'} component={Error404} />
      </Switch>
    </Router>
  )
}

export default AppRouter
