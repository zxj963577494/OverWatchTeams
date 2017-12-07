import { combineReducers } from 'redux'
import { articlesReducer, stickyArticlesReducer } from './articles'
import { userReducer } from './user'
import { appReducer } from './app'
import navbarReducer from './navbar'
import { userTeamsReducer } from './userteams'
import { teamsReducer } from './home/teams'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  articles: articlesReducer,
  sticky: stickyArticlesReducer,
  navbar: navbarReducer,
  userteams: userTeamsReducer,
  teams: teamsReducer
})

export default rootReducer
