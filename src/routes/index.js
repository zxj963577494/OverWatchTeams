import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route, Switch } from 'react-router'
import { App, Home, Login, Account, SignUp, Mime } from '../containers'

export default (history, navbar) => {
  const routes = (
    <Router history={history}>
      <div>
        <Switch>
          <Route exec path="/login" component={Login} />
          <Route exec path="/signup" component={SignUp} />
          <App history={history}>
            <Switch>
              <Route exec path="/home" component={Home} />
              <Route exec path="/account/mime" component={Mime} />
              <Route exec path="/account" component={Account} />
            </Switch>
          </App>
        </Switch>
      </div>
    </Router>
  )
  return routes
}
