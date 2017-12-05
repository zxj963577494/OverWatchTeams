import { combineReducers } from 'redux'
import { articlesReducer, stickyArticlesReducer } from './articles'
import { userReducer } from './user'
import { userInfoReducer } from './userinfo'
import { appReducer } from './app'
import { commonReducer } from './common'
import { userTeamsReducer } from './teams'
import navbarReducer from './navbar'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  userinfo: userInfoReducer,
  userteams: userTeamsReducer,
  articles: articlesReducer,
  sticky: stickyArticlesReducer,
  navbar: navbarReducer,
  common: commonReducer,
})

export default rootReducer
