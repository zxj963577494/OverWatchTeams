import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route, Switch } from 'react-router'
import { MyNavBar } from '../components'
import {
  App,
  Home,
  Articles,
  Jokes,
  Pictures,
  Detail,
  Login,
  Account,
  Welcome
} from '../containers'

export default (history, navbar) => {
  const routes = (
    <Router history={history}>
      <div>
        <Route exec path="/" component={Welcome} />
        <MyNavBar navbar={navbar} history={history} />
        <Switch>
          <Route exec path="/article/:id" component={Detail} />
          <Route exec path="/joke/:id" component={Detail} />
          <Route exec path="/picture/:id" component={Detail} />
          <Route exec path="/login" component={Login} />
          <Route exec path="/account" component={Account} />
          <App history={history}>
            <Route exec path="/home" component={Home} />
            <Route exec path="/articles" component={Articles} />
            <Route exec path="/jokes" component={Jokes} />
            <Route exec path="/pictures" component={Pictures} />
          </App>
        </Switch>
      </div>
    </Router>
  )
  return routes
}
