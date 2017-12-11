import { combineReducers } from 'redux'
import { articlesReducer, stickyArticlesReducer } from './articles'
import { userReducer } from './user'
import { appReducer } from './app'
import navbarReducer from './navbar'
import { teamReducer } from './team'
import {recruitOrderReducer} from './recruitOrder'
import {groupOrderReducer} from './groupOrder'
import {warOrderReducer} from './warOrder'
import {resumeOrderReducer} from './resumeOrder'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  articles: articlesReducer,
  sticky: stickyArticlesReducer,
  navbar: navbarReducer,
  team: teamReducer,
  recruitOrder: recruitOrderReducer,
  groupOrder: groupOrderReducer,
  warOrder: warOrderReducer,
  resumeOrder: resumeOrderReducer
})

export default rootReducer
