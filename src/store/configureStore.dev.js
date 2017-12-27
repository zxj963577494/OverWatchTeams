import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import CreateSagaMiddleware, { END } from 'redux-saga'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createLogger } from 'redux-logger'
//import DevTools from '../containers/DevTools/DevTools'
import reducers from '../reducers'

const config = {
  key: 'root',
  storage,
  debug: true
}

const reducer = persistCombineReducers(config, {
  ...reducers,
  router: routerReducer
})

export default function configureStore(initialState) {
  const sagaMiddleware = CreateSagaMiddleware()
  const history = createHistory()
  const routeMiddleware = routerMiddleware(history)
  const loggerMiddleware = createLogger()
  const middlewares = [routeMiddleware, sagaMiddleware, loggerMiddleware]
  const enhancers = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //DevTools.instrument(),
  )
  const store = createStore(reducer, initialState, enhancers)
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  store.history = history
  const persistor = persistStore(store)
  return { persistor, store }
}
