import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Register, Error404, Landing } from 'screens'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/register'} component={Register} />
        <Route path={'/landing'} component={Landing} />
        <Route path={'/'} component={Landing} />
        <Route path={'*'} component={Error404} />
      </Switch>
    </Router>
  )
}

export default AppRouter
