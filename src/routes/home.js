import React from 'react'
import { Route, Switch } from 'react-router'
import {
  Home,
  HomeUserInfoDetail,
  HomeUserInfos,
  HomeTeamDetail,
  HomeTeams,
  HomeRecruitOrders,
  HomeGroupOrders,
  HomeWarOrders,
  HomeResumeOrders
} from '../containers'
export default () => {
  const routes = (
    <Switch>
      <Route exec path="/home/recruitorders" component={HomeRecruitOrders} />
      <Route exec path="/home/grouporders" component={HomeGroupOrders} />
      <Route exec path="/home/warorders" component={HomeWarOrders} />
      <Route exec path="/home/resumeorders" component={HomeResumeOrders} />
      <Route exec path="/home/team/:id" component={HomeTeamDetail} />
      <Route exec path="/home/teams" component={HomeTeams} />
      <Route exec path="/home/userinfo/:id" component={HomeUserInfoDetail} />
      <Route exec path="/home/userinfos" component={HomeUserInfos} />
      <Route exec path="/home" component={Home} />
    </Switch>
  )
  return routes
}
