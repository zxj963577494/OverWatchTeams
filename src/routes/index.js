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
  HomeRecruitOrders,
  HomeGroupOrders,
  HomeWarOrders,
  AccountMime,
  AccountMyTeams,
  AccountMyTeamsCreate,
  AccountMyTeamsEdit,
  AccountInTeams,
  AccountMemberDetail,
  AccountMemberRemove,
  AccountRecruitOrdersCreate,
  AccountRecruitOrdersEdit,
  AccountRecruitOrders,
  AccountGroupOrdersCreate,
  AccountGroupOrdersEdit,
  AccountGroupOrders,
  AccountWarOrdersCreate,
  AccountWarOrdersEdit,
  AccountWarOrders,
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
              <Route
                exec
                path="/home/recruitorders"
                component={HomeRecruitOrders}
              />
              <Route
                exec
                path="/home/grouporders"
                component={HomeGroupOrders}
              />
              <Route
                exec
                path="/home/warorders"
                component={HomeWarOrders}
              />
              <Route exec path="/home/team/:id" component={HomeTeamDetail} />
              <Route exec path="/home/teams" component={HomeTeams} />
              <Route exec path="/home/user/:id" component={HomeUserDetail} />
              <Route exec path="/home/users" component={HomeUsers} />
              <Route exec path="/home" component={Home} />
              <Route
                exec
                path="/account/recruitorders/create"
                component={AccountRecruitOrdersCreate}
              />
              <Route
                exec
                path="/account/recruitorders/edit/:id"
                component={AccountRecruitOrdersEdit}
              />
              <Route
                exec
                path="/account/recruitorders"
                component={AccountRecruitOrders}
              />
              <Route
                exec
                path="/account/grouporders/create"
                component={AccountGroupOrdersCreate}
              />
              <Route
                exec
                path="/account/grouporders/edit/:id"
                component={AccountGroupOrdersEdit}
              />
              <Route
                exec
                path="/account/grouporders"
                component={AccountGroupOrders}
              />
              <Route
                exec
                path="/account/warorders/create"
                component={AccountWarOrdersCreate}
              />
              <Route
                exec
                path="/account/warorders/edit/:id"
                component={AccountWarOrdersEdit}
              />
              <Route
                exec
                path="/account/warorders"
                component={AccountWarOrders}
              />
              <Route exec path="/account/mime" component={AccountMime} />
              <Route exec path="/account/inteams" component={AccountInTeams} />
              <Route
                exec
                path="/account/myteams/member/detail/:teamid/:memberid"
                component={AccountMemberDetail}
              />
              <Route
                exec
                path="/account/myteams/member/remove/:teamid"
                component={AccountMemberRemove}
              />
              <Route
                exec
                path="/account/myteams/create"
                component={AccountMyTeamsCreate}
              />
              <Route
                exec
                path="/account/myteams/edit/:id"
                component={AccountMyTeamsEdit}
              />
              <Route exec path="/account/myteams" component={AccountMyTeams} />
              <Route exec path="/account" component={Account} />
            </Switch>
          </App>
        </Switch>
      </div>
    </Router>
  )
  return routes
}
