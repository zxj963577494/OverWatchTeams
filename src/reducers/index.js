import { combineReducers } from 'redux'
import { articlesReducer, stickyArticlesReducer } from './articles'
import { jokesReducer } from './jokes'
import { picturesReducer } from './pictures'
import { detailReducer } from './detail'
import { commentsReducer } from './comments'
import { loginReducer } from './login'
import tabbarsReducer from './tabbars'
import navbarReducer from './navbar'

const rootReducer = combineReducers({
  articles: articlesReducer,
  jokes: jokesReducer,
  pictures: picturesReducer,
  comments: commentsReducer,
  detail: detailReducer,
  sticky: stickyArticlesReducer,
  login: loginReducer,
  tabbars: tabbarsReducer,
  navbar: navbarReducer
})

export default rootReducer
