import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import CreateSagaMiddleware, { END } from 'redux-saga'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import reducers from '../reducers'

const config = {
  key: 'root',
  storage
}

const reducer = persistCombineReducers(config, {
  ...reducers,
  router: routerReducer
})

export default function configureStore(initialState) {
  const sagaMiddleware = CreateSagaMiddleware()
  const history = createHistory()
  const routeMiddleware = routerMiddleware(history)
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware, routeMiddleware)
  )
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  store.history = history
  const persistor = persistStore(store)
  return { persistor, store }
}
