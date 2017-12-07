import { combineReducers } from 'redux'
import { articlesReducer, stickyArticlesReducer } from './articles'
import { userReducer } from './user'
import { userInfoReducer } from './userinfo'
import { appReducer } from './app'
import navbarReducer from './navbar'
import { userTeamsReducer } from './userteams'
import { membersReducer } from './home/members'
import { teamsReducer } from './home/teams'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  userinfo: userInfoReducer,
  articles: articlesReducer,
  sticky: stickyArticlesReducer,
  navbar: navbarReducer,
  members: membersReducer,
  userteams: userTeamsReducer,
  teams: teamsReducer
})

export default rootReducer
