import React from 'react'
import ReactDOM from 'react-dom'
import AV from 'leancloud-storage'
import { Root } from './containers'
import rootSaga from './sagas'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker'

const appId = 'Vvtn3QVyWcN9eVbuAT3wjMfG-9Nh9j0Va'
const appKey = 'P59gxu0DMT7GkFeP1VlJoVmp'
AV.init({ appId, appKey })

const { persistor, store } = configureStore({})

store.runSaga(rootSaga)

ReactDOM.render(
  <Root store={store} persistor={persistor} />,
  document.getElementById('root')
)
registerServiceWorker()
