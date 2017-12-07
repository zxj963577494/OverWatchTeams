import React from 'react'
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route, Switch } from 'react-router'
import {
  App,
  Home,
  Login,
  Account,
  SignUp,
  HomeUserDetail,
  HomeUsers,
  HomeTeamDetail,
  HomeTeams,
  AccountMime,
  AccountTeams,
  AccountTeamsCreate,
  AccountTeamsEdit,
  AccountMembersDetail,
  AccountTeamsIn
} from '../containers'

export default (history, navbar) => {
  const routes = (
    <Router history={history}>
      <div>
        <Switch>
          <Route exec path="/login" component={Login} />
          <Route exec path="/signup" component={SignUp} />
          <App history={history}>
            <Switch>
              <Route exec path="/home/team/:id" component={HomeTeamDetail} />
              <Route exec path="/home/teams" component={HomeTeams} />
              <Route
                exec
                path="/home/user/:id"
                component={HomeUserDetail}
              />
              <Route exec path="/home/users" component={HomeUsers} />
              <Route exec path="/home" component={Home} />
              <Route exec path="/account/mime" component={AccountMime} />
              <Route
                exec
                path="/account/teams/create"
                component={AccountTeamsCreate}
              />
              <Route
                exec
                path="/account/teams/edit/:id"
                component={AccountTeamsEdit}
              />
              <Route exec path="/account/teams" component={AccountTeams} />
              <Route exec path="/account/teamsin" component={AccountTeamsIn} />
              <Route
                exec
                path="/account/members/detail/:teamid/:memberid"
                component={AccountMembersDetail}
              />
              <Route exec path="/account" component={Account} />
            </Switch>
          </App>
        </Switch>
      </div>
    </Router>
  )
  return routes
}
