import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Error404 from 'screens/Error404'
import Landing from 'screens/Landing'

const AppRouter = ({ serverAddress }) => {
  return (
    <Router>
      <Switch>
        <Route path={'/landing'}>
          <h1>
            <Landing serverAddress={serverAddress} />
          </h1>
        </Route>
        <Route exact path={'/'}>
          <h1>
            <Landing serverAddress={serverAddress} />
          </h1>
        </Route>
        <Route path={'*'}>
          <h1>
            <Error404 />
          </h1>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
