import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route, Switch } from 'react-router'
import { App, SignUp, Login } from '../containers'

export default (history, navbar) => {
  const routes = (
    <Router keyLength={12} history={history}>
      <Switch>
        <Route exec path="/login" component={Login} />
        <Route exec path="/signup" component={SignUp} />
        <Route exec path="*" component={App} />
      </Switch>
    </Router>
  )
  return routes
}
